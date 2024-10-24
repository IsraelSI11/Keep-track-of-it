import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useAuth } from "../contexts/authContext/useAuth"
import { getCostsOfMonthGroupedByCategory } from "../lib/firebase/database"
import { Loading } from "./Loading"

export const description = "An interactive line chart"
const chartConfig = {
    views: {
        label: "Page Views",
    },
    cost: {
        label: "Costs",
    },
} satisfies ChartConfig

export function LineChartCostMonth() {

    const { currentUser } = useAuth();

    const [chartData, setChartData] = React.useState<{ category: string; cost: number }[]>();

    const [loading, setLoading] = React.useState(true);

    const year = useSelector((state: RootState) => state.monthSelector.year);

    const month = useSelector((state: RootState) => state.monthSelector.month);

    const date = new Date(year, month - 1, 1);

    React.useEffect(() => {
        if (currentUser) {
            setLoading(true);
            getCostsOfMonthGroupedByCategory(currentUser.uid as string, date.toISOString()).then((data) => {
                setChartData(data);
                setLoading(false);
            })
        }
    }, [currentUser,year, month]);

    let formatedMonth = new Date(year, month - 1).toLocaleDateString('es-ES', { month: 'long' });
    formatedMonth = formatedMonth.charAt(0).toUpperCase() + formatedMonth.slice(1);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Costes mes - {formatedMonth}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey={'cost'}
                            type="monotone"
                            stroke={`var(--prussian-blue)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}