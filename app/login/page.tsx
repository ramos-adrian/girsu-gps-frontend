'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";
import {Button} from "@/components/ui/button";
import {publicApiBaseURL} from "@/app/config";
import {useRouter} from "next/navigation";

const loginSchema = z.object({
    username: z.string()
        .regex(/^[a-zA-Z0-9_-]+$/, {message: 'Usuario inválido.'}),
    password: z.string()
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {

    const router = useRouter();

    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginFormInputs) => {
        fetch(`${publicApiBaseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) {
                    router.push('/admin');
                } else {
                    console.error('Error:', response);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <main className="container mx-auto flex flex-col items-center ">
            <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                    <div className="pb-4 w-full max-w-md">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) =>
                                <FormItem>
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="user"/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                                </FormItem>
                            }
                        />
                    </div>
                    <div className="pb-4 w-full max-w-md">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) =>
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                </FormItem>
                            }
                        />
                    </div>
                    <Button type="submit">Iniciar sesión</Button>
                </form>
            </Form>
        </main>
    )
}