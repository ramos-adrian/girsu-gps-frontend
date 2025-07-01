'use client';

import { DataTable } from '@/app/admin/data-table';
import { columns } from '@/app/admin/columns';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {publicApiBaseURL} from "@/app/config";

const clearNotifications = () => {
    fetch(`${publicApiBaseURL}/user/resetAllNotifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Notificaciones eliminadas correctamente");
        })
        .catch(error => {
            console.error('Error clearing notifications:', error);
            alert("Error al eliminar las notificaciones");
        });
}

export default function TruckTable() {

    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            setToken(token);
        }
    }, [token]);

    return (
        <main className="container mx-auto flex flex-col px-5">
            <h1 className="text-2xl">Camiones</h1>
            <DataTable columns={columns} />
            <div>
                <Button onClick={clearNotifications} variant={"ghost"}>
                    Clear Notifications
                </Button>
            </div>
        </main>
    );
}