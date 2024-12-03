'use client';

import { DataTable } from '@/app/admin/data-table';
import { columns } from '@/app/admin/columns';
import {useEffect, useState} from "react";

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
        </main>
    );
}