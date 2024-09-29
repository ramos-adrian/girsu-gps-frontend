'use client';

import {AdvancedMarker, APIProvider, Map} from "@vis.gl/react-google-maps";
import React, {useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";
import {TruckIcon} from "@/app/ui/TruckIcon";

type Poi = {
    id: number,
    truckId: number,
    latitude: number,
    longitude: number,
    timestamp: number,
    direction?: "N" | "S" | "E" | "W"
};
type TruckLocationUpdateDTO = {
    id: number;
    truckId: number;
    latitude: number;
    longitude: number;
    timestamp: number;
};

// Singleton WebSocket Client
let client: Client | null = null;

// Websocket Client
function receiveTruckPositionUpdates(setPois: (value: (((prevState: Poi[]) => Poi[]) | Poi[])) => void) {
    if (client) return;

    client = new Client({
        brokerURL: process.env.NEXT_PUBLIC_CITY_WEB_SOCKET_BROKER_URL as string,
        onConnect: () => {
            client?.subscribe(process.env.NEXT_PUBLIC_CITY_WEB_SOCKET_TRUCK_LOCATION_UPDATES_TOPIC as string, (message) => {
                const data: TruckLocationUpdateDTO = JSON.parse(message.body);
                setPois((prevState: Poi[]) => {
                    // Find the truck in the list if it exists
                    const existingPoi = prevState.find(poi => poi.truckId === data.truckId);
                    if (existingPoi) {
                        // Calculate the direction of the truck
                        const angle = Math.atan2(data.latitude - existingPoi.latitude, data.longitude - existingPoi.longitude) * 180 / Math.PI;
                        if (angle > -45 && angle <= 45) {
                            existingPoi.direction = "E";
                        } else if (angle > 45 && angle <= 135) {
                            existingPoi.direction = "N";
                        } else if (angle > -135 && angle <= -45) {
                            existingPoi.direction = "S";
                        } else {
                            existingPoi.direction = "W";
                        }
                    }
                    return prevState.filter(poi => poi.truckId !== data.truckId
                        && (Date.now() - data.timestamp <= 10 * 60 * 1000)) // Discard old updates (older than 10 minutes)
                        .concat({
                            id: data.truckId,
                            truckId: data.truckId,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            timestamp: data.timestamp,
                            direction: existingPoi?.direction
                        })
                });
            });
        },
        onDisconnect: () => {
            console.log('Disconnected from WebSocket');
        },
    });

    client.activate();
}

const PoiMarkers = () => {

    const [pois, setPois] = useState<Poi[]>([]);

    useEffect(() => {
        receiveTruckPositionUpdates(setPois);
    }, []);

    return <>
        {pois.map((poi: Poi) => (
            <AdvancedMarker key={poi.truckId} position={{lat: poi.latitude, lng: poi.longitude}}>
                <TruckIcon direction={poi.direction}/>
            </AdvancedMarker>
        ))}
    </>
}

export default function Home() {

    return (
        <main className="container mx-auto flex flex-col">
            <h1 className="text-4xl font-semibold text-center mb-3">Mapa de Camiones de Residuos</h1>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                <div className="flex">
                    <Map
                        style={{width: '100%', height: '75vh'}}
                        defaultCenter={{
                            lat: parseFloat(process.env.NEXT_PUBLIC_CITY_LAT as string),
                            lng: parseFloat(process.env.NEXT_PUBLIC_CITY_LNG as string)
                        }}
                        defaultZoom={parseInt(process.env.NEXT_PUBLIC_CITY_ZOOM as string)}
                        gestureHandling={process.env.NEXT_PUBLIC_GOOGLE_MAP_GESTURE_HANDLING as string}
                        disableDefaultUI={true}
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string}
                        restriction={{
                            latLngBounds: {
                                north: parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_NORTH as string),
                                south: parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_SOUTH as string),
                                east: parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_EAST as string),
                                west: parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_WEST as string)
                            },
                        }}
                    >
                        <PoiMarkers/>
                    </Map>
                </div>
            </APIProvider>
        </main>
    );
}
