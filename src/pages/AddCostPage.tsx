import { Separator } from "../components/ui/separator";
import { CostForm } from "../components/CostForm";
import { RecentCostsLogList } from "../components/RecentCostsLogList";

export function AddCostPage() {
    return (
        <div className="w-full mx-4 mb-8">
            <h1 className="text-3xl font-semibold">Añadir gasto</h1>
            <p className="mb-4">Rellena los datos del formulario para registrar un gasto</p>
            <div className="w-full flex flex-col lg:flex-row justify-around">
                <div className="lg:w-1/2 border rounded-2xl mb-4 lg:mb-0 p-4">
                    <h2 className="text-2xl font-semibold">Gastos añadidos recientemente</h2>
                    <Separator className="mt-2 mb-4"/>
                    <RecentCostsLogList />
                </div>
                <div className="lg:w-1/3 border rounded-2xl p-4 h-full">
                    <h2 className="text-2xl font-semibold">Añadir gasto</h2>
                    <Separator className="mt-2 mb-4"/>
                    <CostForm />
                </div>
            </div>
        </div>
    )
}