
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/authContext/useAuth"
import { getCostsOfYearGroupedByMonth } from "../lib/firebase/database"
import { Loading } from "./Loading"
import { Separator } from "./ui/separator"

export const description = "A bar chart"

const chartConfig = {
    cost: {
        label: "Cost",
    },
} satisfies ChartConfig

export function BarChartCostYear() {

    const { currentUser } = useAuth();

    const [chartData, setChartData] = useState<{ month: string; cost: number }[]>([]);

    const [loading, setLoading] = useState(true);

    const year = useSelector((state: RootState) => state.monthSelector.year)

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            getCostsOfYearGroupedByMonth(currentUser.uid as string, year).then((data) => {
                setChartData(data);
                setLoading(false);
            })
        }
    }, [currentUser, year])

    if (loading) {
        return (
            <div className="flex justify-center">
                <Loading />
            </div>

        )
    }

    return (
        <Card className="h-full">
            <CardHeader className="space-y-6">
                <CardTitle>Gastos año - {year}</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="h-96 flex flex-col justify-center items-center">
                        <p>No hay gastos registrados para esta fecha</p>
                    </div>

                ) : (
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                className="uppercase text-xl"
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="cost" fill="var(--prussian-blue)" radius={8} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}