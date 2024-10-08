import {DataTable} from "@/app/admin/data-table";
import {columns} from "@/app/admin/columns";
import {Truck} from "@/app/types";
import {apiBaseUrl} from "@/app/config";
import {Button} from "@/components/ui/button";

async function getData(): Promise<Truck[]> {
    const url = `${apiBaseUrl}/trucks`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${btoa("admin:smtadminx")}`,
                ContentType: 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default async function truckTable() {

    const data = await getData()

    return (
        <main className="container mx-auto flex flex-col px-5">
            <h1 className="text-2xl">Camiones</h1>
            <DataTable columns={columns} data={data}/>
        </main>
    );
}
