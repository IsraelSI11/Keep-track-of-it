/* eslint-disable @typescript-eslint/no-explicit-any */
import { CostForm } from "../components/CostForm";
import { CostsLogList } from "../components/CostsLogList";
import { MonthSelector } from "../components/MonthSelector";

export function HomePage() {

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="w-1/2 p-6 border rounded-xl">
                        <h2 className="font-bold text-2xl mb-2">Lista de gastos recientes:</h2>
                        
                        <CostsLogList />
                    </div>
                    <div className="w-1/3 p-6 border rounded-xl">
                        <h2 className="font-bold text-2xl mb-2">Registrar nuevo gasto:</h2>
                        <CostForm />
                    </div>
                </div>
                <div>
                   
                </div>
            </div>
        </>
    )
}