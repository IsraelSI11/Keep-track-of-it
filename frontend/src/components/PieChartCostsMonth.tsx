import React, { useEffect } from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label, Pie, PieChart } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getCostsOfMonthGroupedByCategory } from "../lib/firebase/database";
import { useAuth } from "../contexts/authContext/useAuth";
import { Loading } from "./Loading";
import { Separator } from "./ui/separator";

export function PieChartCostsMonth() {

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

    const { currentUser } = useAuth();

    const [chartData, setChartData] = React.useState<{ category: string; cost: number }[]>([]);

    const [loading, setLoading] = React.useState(true);

    const year = useSelector((state: RootState) => state.monthSelector.year);

    const month = useSelector((state: RootState) => state.monthSelector.month);

    const date = new Date(year, month - 1, 1);

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            getCostsOfMonthGroupedByCategory(currentUser.uid as string, date.toISOString()).then((data) => {
                setChartData(data);
                setLoading(false);
            })
        }
    }, [currentUser, year, month])

    const totalCosts = React.useMemo(() => {
        if (!chartData) return 0;
        return chartData.reduce((acc, curr) => acc + curr.cost, 0)
    }, [chartData])

    let formatedMonth = new Date(year, month - 1).toLocaleDateString('es-ES', { month: 'long' });
    formatedMonth = formatedMonth.charAt(0).toUpperCase() + formatedMonth.slice(1);

    if (loading) {
        return (
            <div className="flex justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="space-y-6">
                <CardTitle>Distribución gasto - {year} - {formatedMonth}</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {chartData.length === 0 ? (
                    <div className="h-96 flex flex-col justify-center items-center">
                        <p>No hay gastos registrados para esta fecha</p>
                    </div>

                ) : (
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
                )}
            </CardContent>
        </Card>
    )
}