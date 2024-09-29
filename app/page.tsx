'use client';

import {AdvancedMarker, APIProvider, Map} from "@vis.gl/react-google-maps";
import React from "react";
import {TruckIcon} from "@/app/ui/TruckIcon";

type Poi = { key: string, location: google.maps.LatLngLiteral, direction?: "N" | "S" | "E" | "W" };
const locations: Poi[] = [
    {key: 'truck1', location: {lat: -26.805625996712127, lng: -65.22687238990655}, direction: "N"},
    {key: 'truck2', location: {lat: -26.80660066039759, lng: -65.21893113020847}},
    {key: 'truck3', location: {lat: -26.809142935573686, lng: -65.22340401023874}, direction: "S"},
    {key: 'truck4', location: {lat: -26.799738657835317, lng: -65.21898715450519}, direction: "E"},
];

const PoiMarkers = (props: { pois: Poi[] }) =>
    <>
        {props.pois.map((poi: Poi) => (
            <AdvancedMarker key={poi.key} position={poi.location}>
                <TruckIcon direction={poi.direction}/>
            </AdvancedMarker>
        ))}
    </>


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
                    >
                        <PoiMarkers pois={locations}/>
                    </Map>
                </div>
            </APIProvider>
        </main>
    );
}
