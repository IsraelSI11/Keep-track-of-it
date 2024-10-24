import { BarChartCostYear } from "../components/BarChartCostYear";
import { LineChartCostMonth } from "../components/LineChartCostMonth";
import { MonthSelector } from "../components/MonthSelector";
import { PieChartCostsMonth } from "../components/PieChartCostsMonth";

export function DashboardPage() {
    return (
        <div className="w-full mx-4 mb-8">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <section className="flex items-center space-x-8 mb-6">
                <p className="mb-2">Selecciona una fecha para visualizar:</p>
                <MonthSelector />
            </section>
            <section className="w-full flex flex-col space-y-6">
                <LineChartCostMonth />
                <div className="flex justify-between flex-col lg:space-x-4 lg:flex-row">
                    <div className="w-full lg:w-1/2">
                        <PieChartCostsMonth />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <BarChartCostYear />
                    </div>
                </div>

            </section>
        </div>
    )
}