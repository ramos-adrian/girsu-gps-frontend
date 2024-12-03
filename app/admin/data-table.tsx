"use client"

import {
    ColumnDef,
    flexRender,
    getPaginationRowModel,
    getCoreRowModel,
    useReactTable, ColumnFiltersState, getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import React, {useEffect, useState} from "react";
import {AddTruckBtn} from "@/app/admin/AddTruckButton";
import {publicApiBaseURL} from "@/app/config";
import {Truck} from "@/app/types";

interface DataTableProps<TValue> {
    columns: ColumnDef<Truck, TValue>[]
}

export function DataTable<TValue>({columns}: DataTableProps<TValue>) {

    const [data, setData] = useState<Truck[]>([]);

    useEffect(() => {
        const url = `${publicApiBaseURL}/trucks`;
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
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData([]);
            });
    }, []);

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <div className="pt-4">
            <div className="flex flex-col md:flex-row md:justify-between">
                <AddTruckBtn data={data} setData={setData} className="mb-4 md:hidden"/>
                <div className="mb-4">
                    <Input
                        placeholder="Filtrar por patente..."
                        value={(table.getColumn("plate")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("plate")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <AddTruckBtn data={data} setData={setData} className="hidden mb-4 md:flex"/>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >

                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id == "route")
                                            return (<TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell ? "Sí" : "No", cell.getContext())}
                                            </TableCell>)

                                        return (<TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>)
                                    })}

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sin resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
