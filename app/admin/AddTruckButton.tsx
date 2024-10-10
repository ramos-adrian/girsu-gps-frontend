'use client'

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import {AddTruckForm} from "@/app/admin/AddTruckForm";
import {Truck} from "@/app/types";

export const AddTruckBtn = ({data, setData, className}: { data: Truck[], setData:  React.Dispatch<React.SetStateAction<Truck[]>>, className: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className={className}>Añadir camión</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir nuevo camión</DialogTitle>
                </DialogHeader>
                <AddTruckForm setIsOpen={setIsOpen} data={data} setData={setData}/>
            </DialogContent>
        </Dialog>
    )
}