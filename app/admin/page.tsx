import { DataTable } from '@/app/admin/data-table';
import { columns } from '@/app/admin/columns';

export default function TruckTable() {

    return (
        <main className="container mx-auto flex flex-col px-5">
            <h1 className="text-2xl">Camiones</h1>
            <DataTable columns={columns} />
        </main>
    );
}