import React from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label, Pie, PieChart } from "recharts";

type PieChartCostsMonthProps = {
    chartData: { category: string; cost: number }[];
}

export function PieChartCostsMonth({ chartData }: PieChartCostsMonthProps) {
    const chartConfig = {
        costs: {
            label: "Costs",
        },
        food: {
            label: "Food",
            color: "hsl(var(--chart-1))",
        },
        transport: {
            label: "Transport",
            color: "hsl(var(--chart-2))",
        },
        housing: {
            label: "Housing",
            color: "hsl(var(--chart-3))",
        },
        entertainment: {
            label: "Entertainment",
            color: "hsl(var(--chart-4))",
        },
        health: {
            label: "Health",
            color: "hsl(var(--chart-5))",
        },
        technology: {
            label: "Technology",
            color: "hsl(var(--chart-6))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-7))",
        },

    } satisfies ChartConfig

    const totalCosts = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.cost, 0)
    }, [chartData])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Distribución coste</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square min-h-[250px] max-h-[550px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="cost"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalCosts.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    €
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}