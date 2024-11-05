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

const chartConfig = {
    climbs: {
        label: "Climbs",
        color: "hsl(var(--accent))",
    },
} satisfies ChartConfig;

interface UserAreaChartProps {
    climbsByWeek: { week: Date; climbs: number }[];
}

export function UserAreaChart({ climbsByWeek }: UserAreaChartProps) {
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedXValue, setSelectedXValue] = useState<number | null>(null);

    const formattedData = climbsByWeek.map((item) => ({
        ...item,
        week: item.week.getTime(),
    }));

    const formatWeek = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const formatMonth = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
        });
    };

    const getMonthTicks = (data: { week: number }[]) => {
        const timestamps = data.map((item) => item.week);
        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);

        const ticks = [];
        const maxDate = new Date(maxTimestamp);

        let currentDate = new Date(minTimestamp).getTime();

        while (currentDate <= maxDate.getTime()) {
            ticks.push(currentDate);
            const currentMonth = new Date(currentDate).getMonth();
            const currentYear = new Date(currentDate).getFullYear();
            currentDate = new Date(currentYear, currentMonth + 1, 1).getTime();
        }

        return ticks;
    };

    const monthTicks = getMonthTicks(formattedData);

    return (
        <Card className="border-none bg-secondary">
            <CardHeader>
                <CardTitle className="text-sm">
                    {selectedWeek &&
                    selectedXValue &&
                    new Date(selectedXValue).getTime() >=
                        new Date().setHours(0, 0, 0, 0) -
                            7 * 24 * 60 * 60 * 1000
                        ? "This week"
                        : selectedWeek
                          ? `${selectedWeek} - ${formatWeek((selectedXValue ?? 0) + 6 * 24 * 60 * 60 * 1000)}`
                          : "Total climbs for the last 3 months"}
                </CardTitle>
                <CardDescription>
                    Showing total climbs for the last 3 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={formattedData}
                        margin={{ left: -20, right: 12, top: 20 }}
                        onClick={(event) => {
                            if (
                                event &&
                                event.activePayload &&
                                event.activePayload.length
                            ) {
                                const payload = event.activePayload[0].payload;
                                setSelectedWeek(formatWeek(payload.week));
                                setSelectedXValue(payload.week);
                            }
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            type="number"
                            domain={["dataMin", "dataMax"]}
                            scale="time"
                            ticks={monthTicks}
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={formatMonth}
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
                        {selectedXValue !== null && (
                            <ReferenceLine
                                x={selectedXValue}
                                stroke="hsl(var(--foreground))"
                            />
                        )}
                        <Area
                            dataKey="climbs"
                            type="monotone"
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
