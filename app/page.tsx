'use client';

import {APIProvider, Map} from "@vis.gl/react-google-maps";
import React from "react";

export default function Home() {
  return (
    <div>
      <main>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <Map
              style={{width: '70vw', height: '70vh'}}
              defaultCenter={{lat: -27.34593843792839, lng: -65.59279522202871}}
              defaultZoom={16}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
          />
        </APIProvider>
      </main>
    </div>
  );
}
