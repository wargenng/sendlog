"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceLine,
    XAxis,
    YAxis,
} from "recharts";
import { SnapshotData } from "~/app/_components/data/snapshot/snapshotdata";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import type { ChartConfig } from "~/components/ui/chart";
import { ChartContainer } from "~/components/ui/chart";

const chartConfig = {
    climbs: {
        label: "Climbs",
        color: "hsl(var(--accent))",
    },
} satisfies ChartConfig;

interface UserAreaChartProps {
    climbsByWeek: {
        week: Date;
        climbs: number;
        sessions: number;
        locations: number;
    }[];
}

interface CustomEvent {
    activePayload?: { payload: { week: number } }[];
}

export function UserAreaChart({ climbsByWeek }: UserAreaChartProps) {
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

    // Calculate the start of the current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Assuming the week starts on Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    const currentWeekTimestamp = startOfWeek.getTime();

    // Check if the current week exists in your data
    const currentWeekData = formattedData.find(
        (item) => item.week === currentWeekTimestamp,
    );

    // Set initial selected values
    const initialSelectedXValue = currentWeekData
        ? currentWeekTimestamp
        : Math.max(...formattedData.map((item) => item.week));
    const initialSelectedWeek = formatWeek(initialSelectedXValue);

    const [selectedWeek, setSelectedWeek] = useState(initialSelectedWeek);
    const [selectedXValue, setSelectedXValue] = useState<number | null>(
        initialSelectedXValue,
    );
    const climbs =
        formattedData.find((item) => item.week === selectedXValue)?.climbs ?? 0;
    const sessions =
        formattedData.find((item) => item.week === selectedXValue)?.sessions ??
        0;
    const locations =
        formattedData.find((item) => item.week === selectedXValue)?.locations ??
        0;

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

    // Helper function to handle pointer event
    const handlePointerEvent = (event: CustomEvent) => {
        if (event?.activePayload?.length) {
            const payload = event.activePayload[0]?.payload;
            if (payload?.week !== undefined) {
                setSelectedWeek(formatWeek(payload.week));
                setSelectedXValue(payload.week);
            }
        }
    };

    const percentageChange =
        (((climbsByWeek.at(-1)?.climbs ?? 0) -
            (climbsByWeek.at(-2)?.climbs ?? 0)) /
            (climbsByWeek.at(-2)?.climbs ?? 1)) *
        100;

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
                          ? `${selectedWeek} - ${formatWeek(
                                (selectedXValue ?? 0) + 6 * 24 * 60 * 60 * 1000,
                            )}, ${selectedXValue ? new Date(selectedXValue).getFullYear() : ""}`
                          : "Total climbs for the last 3 months"}
                </CardTitle>
                <CardDescription></CardDescription>
                <SnapshotData
                    climbs={climbs}
                    sessions={sessions}
                    locations={locations}
                />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={formattedData}
                        margin={{ left: -20, right: 12, top: 20 }}
                        onMouseDown={(event: CustomEvent) =>
                            handlePointerEvent(event)
                        }
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
                        {percentageChange >= 0 ? (
                            <div className="flex items-center gap-2 font-medium leading-none">
                                <span>
                                    Trending up{" "}
                                    {Math.abs(percentageChange).toFixed(2)}%
                                    this week
                                </span>
                                <TrendingUp className="h-4 w-4" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 font-medium leading-none">
                                <span>
                                    Trending down{" "}
                                    {Math.abs(percentageChange).toFixed(2)}%
                                    this week
                                </span>
                                <TrendingDown className="h-4 w-4" />
                            </div>
                        )}
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {new Date(
                                Math.min(
                                    ...formattedData.map((item) => item.week),
                                ),
                            ).toLocaleDateString("en-US", {
                                month: "long",
                            })}{" "}
                            -{" "}
                            {new Date(
                                Math.max(
                                    ...formattedData.map((item) => item.week),
                                ),
                            ).toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
