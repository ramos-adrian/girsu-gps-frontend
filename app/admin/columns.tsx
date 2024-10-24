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
                        <DropdownMenuItem className="text-red-500">
                            <FontAwesomeIcon icon={faTrashAlt} className="mr-2"/>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
