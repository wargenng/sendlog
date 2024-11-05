"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceLine,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { ChartConfig, ChartContainer } from "~/components/ui/chart";

const chartData = [
    { month: "January", climbs: 186 },
    { month: "February", climbs: 305 },
    { month: "March", climbs: 237 },
    { month: "April", climbs: 73 },
    { month: "May", climbs: 209 },
    { month: "June", climbs: 214 },
];

const chartConfig = {
    climbs: {
        label: "Climbs",
        color: "hsl(var(--accent))",
    },
} satisfies ChartConfig;

export function UserAreaChart() {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedXValue, setSelectedXValue] = useState("");

    return (
        <Card className="border-none bg-secondary">
            <CardHeader>
                <CardTitle className="text-sm">
                    {selectedMonth ? selectedMonth : "Last 6 months"}
                </CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={chartData}
                        margin={{ left: -20, right: 12, top: 20 }}
                        onClick={(event) => {
                            if (event && event.activeLabel) {
                                setSelectedMonth(event.activeLabel);
                                setSelectedXValue(event.activeLabel);
                            }
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <defs>
                            <linearGradient
                                id="fillClimbs"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-climbs)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-climbs)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        {selectedXValue && (
                            <ReferenceLine
                                x={selectedXValue}
                                stroke="hsl(var(--foreground))"
                            />
                        )}
                        <Area
                            dataKey="climbs"
                            type="natural"
                            fill="url(#fillClimbs)"
                            fillOpacity={0.4}
                            stroke="var(--color-climbs)"
                            stackId="a"
                            dot={{
                                fill: "var(--color-climbs)",
                                stroke: "var(--color-climbs)",
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
