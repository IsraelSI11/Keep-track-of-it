/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "../components/Header";
import { CostForm } from "../components/CostForm";
import { CostsLogList } from "../components/CostsLogList";
import { PieChartCostsMonth } from "../components/PieChartCostsMonth";
import { MonthSelector } from "../components/MonthSelector";
import { BarChartCostYear } from "../components/BarChartCostYear";
import { LineChartCostMonth } from "../components/LineChartCostMonth";

export function HomePage() {

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
            </main>
            <MonthSelector />
            <PieChartCostsMonth />
            <BarChartCostYear />
            <LineChartCostMonth />
        </div>
    )
}