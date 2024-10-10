"use client"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {apiBaseUrl} from "@/app/config";
import React from "react";
import {Truck} from "@/app/types";

const formSchema = z.object({
    id: z
        .coerce
        .number({message: "Debe ser un número"})
        .int({message: "Debe ser un número entero"})
        .positive({message: "Debe ser un número positivo"})
        .gte(0, {message: "Debe ser mayor o igual a 0"})
        .finite({message: "Debe ser un número finito"})
        .lt(9999, {message: "Debe ser menor que 9999"}),
    plate: z.string()
        .min(3, {message: "Debe tener al menos 3 caracteres"})
        .max(11, {message: "Debe tener como máximo 11 caracteres"}),
});

interface AddTruckFormProps {
    setIsOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setData: React.Dispatch<React.SetStateAction<Truck[]>>
    data: Truck[]
}

export const AddTruckForm = ({data, setIsOpen, setData}: AddTruckFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            plate: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // TODO Change to use the user from the session
        const user = "admin"; // Warning: This is a hardcoded user, it should be replaced by the user from the session
        const password = "smtadminx"; // Warning: This is a hardcoded password, it should be replaced by the password from the session

        fetch(`${apiBaseUrl}/trucks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${user}:${password}`)}`,
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json()
            })
            .then(newTruck => {
                setIsOpen(false);
                setData(
                    [...data.filter(truck => truck.id !== newTruck.id), newTruck]
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <FormField
                        control={form.control}
                        name={"id"}
                        render={
                            ({field}) => (
                                <FormItem>
                                    <FormLabel>ID #</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number"/>
                                    </FormControl>
                                    <FormDescription>Identificador único (Ver en dispositivo GPS)</FormDescription>
                                    <FormMessage>{form.formState.errors.id?.message}</FormMessage>
                                </FormItem>
                            )
                        }
                    />
                </div>
                <FormField
                    name={"plate"}
                    control={form.control}
                    render={
                        ({field}) => (
                            <FormItem>
                                <FormLabel>Patente</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>Patente del vehículo</FormDescription>
                                <FormMessage>{form.formState.errors.plate?.message}</FormMessage>
                            </FormItem>
                        )
                    }
                />
                <div className="relative mb-12">
                    <Button type="submit" className="mt-5 right-0 inset-y-0 absolute">Añadir</Button>
                </div>
            </form>
        </Form>
    )
}