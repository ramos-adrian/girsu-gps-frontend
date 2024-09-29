'use client';

import {APIProvider, Map} from "@vis.gl/react-google-maps";
import React from "react";
import Navbar from "@/app/ui/Navbar";

type Poi = { key: string, location: google.maps.LatLngLiteral }

export default function Home() {
    return (
        <main>
            <Navbar/>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                <Map
                    style={{width: '70vw', height: '70vh'}}
                    defaultCenter={{lat: -33.860664, lng: 151.208138}}
                    defaultZoom={16}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId={'150ff8be8393ef51'}
                >
                </Map>

            </APIProvider>
        </main>
    );
}
