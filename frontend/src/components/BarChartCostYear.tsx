
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const description = "A bar chart"

const chartConfig = {
    cost: {
        label: "Cost",
    },
} satisfies ChartConfig

type BarChartCostYearProps = {
    chartData: { month: string; cost: number }[]
}


export function BarChartCostYear({ chartData }: BarChartCostYearProps) {

    const year = useSelector((state: RootState) => state.monthSelector.year)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Costes año - {year}</CardTitle>
            </CardHeader>
            <CardContent>
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
                        <Bar dataKey="cost" fill="#666666" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}