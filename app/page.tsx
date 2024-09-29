'use client';

import {APIProvider, Map} from "@vis.gl/react-google-maps";
import React from "react";

type Poi = { key: string, location: google.maps.LatLngLiteral }

export default function Home() {
    return (
        <main className="container mx-auto flex flex-col">
            <h1 className="text-4xl font-semibold text-center mb-3">Mapa de Camiones</h1>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                <div className="flex">
                    <Map
                        style={{width: '100%', height: '75vh'}}
                        defaultCenter={{
                            lat: parseFloat(process.env.NEXT_PUBLIC_CITY_LAT as string),
                            lng: parseFloat(process.env.NEXT_PUBLIC_CITY_LNG as string)
                        }}
                        defaultZoom={parseInt(process.env.NEXT_PUBLIC_CITY_ZOOM as string)}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string}
                    >
                    </Map>
                </div>
            </APIProvider>
        </main>
    );
}
