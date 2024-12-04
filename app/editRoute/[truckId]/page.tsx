'use client';

import {APIProvider} from "@vis.gl/react-google-maps";
import {googleMapsApiKey, publicApiBaseURL} from "@/app/config";
import {useEffect, useState} from "react";
import {Truck} from "@/app/types";
import RouteMap from "@/app/editRoute/[truckId]/RouteMap";

export default function Page({params}: { params: { truckId: string } }) {

    const [truck, setTruck] = useState<Truck>();

    useEffect(() => {
        const url = `${publicApiBaseURL}/trucks/${params.truckId}`;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTruck(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [params.truckId]);

    if (!truck) {
        return <div>Loading...</div>;
    }

    return (
        <main className="container mx-auto flex flex-col">
            <h1 className="text-3xl font-semibold mb-3">Editar recorrido de camión {truck.plate} (ID: #{truck.id})</h1>
            <APIProvider apiKey={googleMapsApiKey}>
                <RouteMap truck={truck}/>
            </APIProvider>
        </main>
    );
}
