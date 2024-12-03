import {AdvancedMarker, Map} from "@vis.gl/react-google-maps";
import React, {useEffect, useState} from "react";
import {Client, messageCallbackType} from "@stomp/stompjs";
import {LatLngLiteral, Poi, MovementDirection, TruckLocationUpdateDTO} from "@/app/types";
import {TruckIcon} from "@/app/ui/TruckIcon";
import {
    brokerURL,
    cityGestureHandling,
    cityMapId,
    cityZoom,
    mapDefaultCenter,
    mapRestriction,
    mapStyle, maxUpdateAge, truckLocationUpdatesTopic
} from "@/app/config";

type SetPoisParamsType = (value: (((prevState: Poi[]) => Poi[]) | Poi[])) => void;

/**
 * Calculates the movement direction of a truck based on its old and new positions.
 *
 * @param oldPosition - The previous position of the truck.
 * @param newPosition - The new position of the truck.
 * @returns The direction of the truck as a string ("N", "S", "E", "W").
 */
const calculateMovementDirection = (oldPosition: LatLngLiteral, newPosition: LatLngLiteral): MovementDirection => {
    const angle = Math.atan2(newPosition.lat - oldPosition.lat, newPosition.lng - oldPosition.lng) * 180 / Math.PI;
    if (angle > -45 && angle <= 45) {
        return "E";
    } else if (angle > 45 && angle <= 135) {
        return "N";
    } else if (angle > -135 && angle <= -45) {
        return "S";
    } else {
        return "W";
    }
}

/**
 * Updates the list of POIs with the new truck location data.
 *
 * @param prevState - The previous state of POIs.
 * @param data - The new truck location update data.
 * @returns The updated list of POIs.
 */
const updatePois = (prevState: Poi[], data: TruckLocationUpdateDTO) => {
    const existingPoi = prevState.find(poi => poi.truckId === data.truckId);

    let movementDirection = existingPoi?.direction;

    if (existingPoi) {
        const oldPosition = {lat: existingPoi.latitude, lng: existingPoi.longitude};
        const newPosition = {lat: data.latitude, lng: data.longitude};
        movementDirection = calculateMovementDirection(oldPosition, newPosition);
    }

    const newPoi: Poi = {
        id: data.truckId,
        truckId: data.truckId,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
        direction: movementDirection
    }

    return prevState.filter(poi => poi.truckId !== data.truckId && (Date.now() - poi.timestamp <= maxUpdateAge))
        .concat(newPoi)
}

// Singleton WebSocket Client
let client: Client | null = null;

// Websocket Client
const startTruckPositionWebsocket = (setPois: SetPoisParamsType) => {
    if (client) return;

    const onMessage: messageCallbackType = (message) => {
        const data: TruckLocationUpdateDTO = JSON.parse(message.body);
        setPois(prevState => updatePois(prevState, data));
    }

    const onConnect = () => {
        console.log('Connected to WebSocket');
        client?.subscribe(truckLocationUpdatesTopic, onMessage);
    }

    client = new Client({
        brokerURL,
        onConnect,
        onDisconnect: () => {
            console.log('Disconnected from WebSocket');
        },
    });

    client.activate();
}

const PoiMarkers = () => {

    const [pois, setPois] = useState<Poi[]>([]);

    useEffect(() => {
        startTruckPositionWebsocket(setPois);
    }, []);

    return <>
        {pois.map((poi: Poi) => (
            <AdvancedMarker key={poi.truckId} position={{lat: poi.latitude, lng: poi.longitude}}>
                <TruckIcon direction={poi.direction}/>
            </AdvancedMarker>
        ))}
    </>
}

const MainMap = () =>
    <Map
        style={mapStyle}
        defaultCenter={mapDefaultCenter}
        defaultZoom={cityZoom}
        gestureHandling={cityGestureHandling}
        disableDefaultUI={true}
        mapId={cityMapId}
        restriction={mapRestriction}
    >
        <PoiMarkers/>
    </Map>


export default MainMap;