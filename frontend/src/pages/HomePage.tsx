/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "../components/Header";
import { CostForm } from "../components/CostForm";
import { CostsLogList } from "../components/CostsLogList";
import { useAuth } from "../contexts/authContext/useAuth";
import { getCostsOfMonthGroupedByCategory, getCostsOfMonthGroupedByDay, getCostsOfYearGroupedByMonth } from "../lib/firebase/database";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { PieChartCostsMonth } from "../components/PieChartCostsMonth";
import { MonthSelector } from "../components/MonthSelector";
import { BarChartCostYear } from "../components/BarChartCostYear";
import { LineChartCostMonth } from "../components/LineChartCostMonth";

export function HomePage() {

    const { currentUser } = useAuth();

    const [pieChartData, setPieChartData] = useState<{ category: string; cost: number }[]>();

    const [barChartData, setBarChartData] = useState<{ month: string; cost: number }[]>();

    const [lineChartData, setLineChartData] = useState<{ date: string; cost: number }[]>();

    function onClick() {
        //Obtenemos una fecha con mes de septiembre
        const date = new Date('2024-09-01');
        //Obtenemos los gastos del mes de septiembre
        getCostsOfMonthGroupedByCategory(currentUser.uid as string, date.toISOString()).then((data) => {
            setPieChartData(data);
        })

        getCostsOfYearGroupedByMonth(currentUser.uid as string, date.getFullYear()).then((data) => {
            setBarChartData(data);
        });

        getCostsOfMonthGroupedByDay(currentUser.uid as string, date.toISOString()).then((data) => {
            console.log(data);
            setLineChartData(data);
        });
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
            <MonthSelector />
            <PieChartCostsMonth chartData={pieChartData || []} />
            <BarChartCostYear chartData={barChartData || []} />
            <LineChartCostMonth chartData={lineChartData || []} />
        </div>
    )
}