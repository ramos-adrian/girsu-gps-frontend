'use client';

import {APIProvider} from "@vis.gl/react-google-maps";
import MainMap from "@/app/ui/MainMap";
import {googleMapsApiKey} from "@/app/config";

export default function Home() {

    return (
        <main className="container mx-auto flex flex-col">
            <h1 className="text-4xl font-semibold text-center mb-3">Mapa de Camiones de Residuos</h1>
            <APIProvider apiKey={googleMapsApiKey}>
                <MainMap/>
            </APIProvider>
        </main>
    );
}
