"use client"

import {AdvancedMarker, Map, Pin, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";

import {v4 as uuidv4} from 'uuid';

import {
    cityGestureHandling,
    cityMapId,
    cityZoom,
    mapDefaultCenter,
    mapRestriction,
    mapStyle, maxUpdateAge, pollingInterval, publicApiBaseURL
} from "@/app/config";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Poi, Truck} from "@/app/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {TruckIcon} from "@/app/ui/TruckIcon";

type latLng = { id: string, lat: number, lng: number };
type setPois = (value: (((prevState: latLng[]) => latLng[]) | latLng[])) => void;

interface AddPointBtnProps {
    setPois: setPois,
    polyline: null | google.maps.Polyline
}

const AddPointBtn = ({setPois, polyline}: AddPointBtnProps) => {
    const map = useMap();

    return (
        <Button onClick={() => {
            if (map) {
                const center = map.getCenter();
                if (center) {
                    setPois(prev => {
                        const newPoint = {id: uuidv4(), lat: center.lat(), lng: center.lng()};
                        polyline?.setPath([...prev.map(poi => ({lat: poi.lat, lng: poi.lng})), {
                            lat: newPoint.lat,
                            lng: newPoint.lng
                        }]);
                        return [...prev, newPoint]
                    })
                }
            }
        }}>Añadir punto</Button>
    )
}

interface SaveRouteBtnProps {
    truckId?: number | undefined,
    polyline?: null | google.maps.Polyline
    setPois: setPois,
}

const SaveRouteBtn = ({truckId, polyline, setPois}: SaveRouteBtnProps) => {

    const route = polyline?.getPath().getArray().map((point: google.maps.LatLng) => {
        return {lat: point.lat(), lng: point.lng()}
    });

    return (
        <Button className="mt-2" onClick={() => {
            fetch(`${publicApiBaseURL}/trucks/${truckId}/route`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(route),
            }).then(response => {
                if (!response.ok) {
                    console.log('Error saving route');
                }
                return response.json();
            }).then(data => {
                setPois(data.map((point: { lat: number, lng: number }) => {
                    return {id: uuidv4(), lat: point.lat, lng: point.lng}
                }));
                polyline?.setPath(data.map((point: { lat: number, lng: number }) => {
                    return {lat: point.lat, lng: point.lng}
                }));
            })

        }}
        >Guardar recorrido</Button>
    )
}

interface ClearRouteBtnProps {
    polyline?: null | google.maps.Polyline
    setPois: setPois,
}

const ClearRouteBtn = ({polyline, setPois}: ClearRouteBtnProps) => {

    return (
        <Button className="mt-2 " variant={"destructive"} onClick={() => {
            setPois([]);
            polyline?.setPath([]);
        }}>
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2"/>
            Limpiar Recorrido
        </Button>
    )
}

const PoiMarkers = ({pois, setPois, polyline}: {
    pois: latLng[],
    setPois: setPois,
    polyline: google.maps.Polyline | null
}) => {

    const movePoiHandler = (event: google.maps.MapMouseEvent, id: string) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
        if (lat && lng) setPois(prev => {
            const newPoint = {id, lat, lng};
            const newPois = prev.map(poi => poi.id === id ? newPoint : poi);
            polyline?.setPath(newPois.map(poi => ({
                lat: poi.lat,
                lng: poi.lng
            })));
            return newPois;
        });
    }

    return <>
        {pois.map((poi: latLng) => (
            <AdvancedMarker
                key={poi.id}
                position={{lat: poi.lat, lng: poi.lng}}
                draggable={true}
                onDrag={(e) => movePoiHandler(e, poi.id)}
            >
                <Pin scale={0.7} glyphColor='#008000' borderColor='#0f4d0f' background='#5ce65c'/>
            </AdvancedMarker>
        ))}
    </>
}

function animateCircle(line: null | google.maps.Polyline) {
    if (!line) return;

    let count = 0;

    window.setInterval(() => {
        count = (count + 1) % 200;

        const icons = line.get("icons");

        icons[0].offset = count / 2 + "%";
        line.set("icons", icons);
    }, 20);
}

interface TruckPoiMarkerProps {
    truckId?: number | undefined
}

const TruckPoiMarker = ({truckId}: TruckPoiMarkerProps) => {

    const [poi, setPoi] = useState<Poi>()

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(`${publicApiBaseURL}/trucks/${truckId}/positionRecords/latest`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (!response.ok) {
                    console.log('Error getting trucks location data');
                }
                return response.json();
            }).then(data => {
                if (Date.now() - data.timestamp > maxUpdateAge) return;
                setPoi(
                    {
                        id: data.truckId,
                        truckId: data.truckId,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        timestamp: data.timestamp,
                        direction: data.direction
                    }
                )
            });
        }, pollingInterval);

        return () => clearInterval(intervalId);
    }, []);

    if (!poi) return null;

    return <>
        <AdvancedMarker key={poi.truckId} position={{lat: poi.latitude, lng: poi.longitude}}>
            <TruckIcon direction={poi.direction} />
        </AdvancedMarker>
    </>
}

interface RouteMapProps {
    truck?: Truck
}

const RouteMap = ({truck}: RouteMapProps) => {

    const [pois, setPois] = useState<latLng[]>([]);

    const mapsLib = useMapsLibrary("maps");
    const geoLib = useMapsLibrary("geometry");
    const map = useMap();

    const lineSymbol = {
        path: 2.0,
        scale: 4,
        strokeColor: "#393",
    };

    const polyline = React.useMemo(() => {
        if (!mapsLib) return null;
        return new mapsLib.Polyline({
            path: [],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [{
                icon: lineSymbol,
                offset: "100%",
            }],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapsLib]);

    useEffect(() => {
        animateCircle(polyline);
    }, [polyline]);

    useEffect(() => {
        if (!geoLib) return;
        const route: latLng[] = [];
        truck?.route.forEach((point) => {
            route.push({id: uuidv4(), lat: point.lat, lng: point.lng})
        });
        setPois(route);
        polyline?.setPath(route.map(poi => ({lat: poi.lat, lng: poi.lng})));
    }, [geoLib, polyline, truck?.route]);

    polyline?.setMap(map);

    return (
        <div className='flex flex-row'>
            <Map
                style={mapStyle}
                defaultCenter={mapDefaultCenter}
                defaultZoom={cityZoom}
                gestureHandling={cityGestureHandling}
                disableDefaultUI={true}
                mapId={cityMapId}
                restriction={mapRestriction}
            >
                <PoiMarkers pois={pois} setPois={setPois} polyline={polyline}/>
                <TruckPoiMarker truckId={truck?.id}/>
            </Map>
            <div className='flex flex-col ml-3'>
                <AddPointBtn setPois={setPois} polyline={polyline}/>
                <SaveRouteBtn truckId={truck?.id} polyline={polyline} setPois={setPois}/>
                <ClearRouteBtn polyline={polyline} setPois={setPois}/>
            </div>
        </div>
    )
}

export default RouteMap;