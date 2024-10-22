/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "../components/Header";
import { CostForm } from "../components/CostForm";
import { CostsLogList } from "../components/CostsLogList";
import { useAuth } from "../contexts/authContext/useAuth";
import { getCostsOfMonthGroupedByCategory } from "../lib/firebase/database";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { PieChartCostsMonth } from "../components/PieChartCostsMonth";

export function HomePage() {

    const { currentUser } = useAuth();

    const [charData, setChartData] = useState<{ category: string; cost: number }[]>();

    function onClick() {
        //Obtenemos una fecha con mes de septiembre
        const date = new Date('2024-09-01');
        //Obtenemos los gastos del mes de septiembre
        getCostsOfMonthGroupedByCategory(currentUser.uid as string, date.toISOString()).then((data) => {
            setChartData(data);
        })
    }



    return (
        <div>
            <Header />
            <main className="flex justify-around mt-12">
                <div className="w-1/3 p-6 border rounded-xl">
                    <h2 className="font-bold text-2xl mb-2">Lista de gastos:</h2>
                    <CostsLogList />
                </div>
                <div className="w-1/3">
                    <CostForm />
                </div>
                <Button onClick={onClick}>Obtener gastos de septiembre</Button>
            </main>

            <PieChartCostsMonth chartData={charData || []} />
            
        </div>
    )
}