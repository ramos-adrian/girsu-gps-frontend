"use client"

import {ColumnDef} from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"
import {Truck} from "@/app/types";
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faRoute} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {publicApiBaseURL} from "@/app/config";

const deleteTruck = async (id: number) => {
    const url = `${publicApiBaseURL}/trucks/${id}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Optionally, you can handle the response or update the UI after deletion
        alert("Camión eliminado correctamente");
    } catch (error) {
        console.error('Error deleting truck:', error);
        alert("Error al eliminar el camión");
    }
}

export const columns: ColumnDef<Truck>[] = [
    {
        accessorKey: "id",
        header: "ID #",
    },
    {
        accessorKey: "plate",
        header: "Patente",
    },
    {
      accessorKey: "route",
      header: "Ruta asignada",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const truck = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(truck.id as unknown as string)}>
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(truck.plate as unknown as string)}>
                            Copiar patente
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => {}}>
                            <FontAwesomeIcon icon={faRoute} className="mr-2"/>
                            <Link href={`/editRoute/${truck.id}`}>Editar ruta</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteTruck(truck.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} className="mr-2"/>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
