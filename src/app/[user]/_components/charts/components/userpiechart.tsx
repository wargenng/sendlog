"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "~/components/ui/chart";
import { UserChartFilter } from "./userchartfilter";
import { Climb } from "~/server/db/schema";
import { locations } from "~/app/utils/locations";

export const description = "A donut chart with text";

const chartConfig = {
    climbs: {
        label: "Climbs",
    },
    outdoors: {
        label: "Outdoors",
        color: "hsl(var(--chart-1))",
    },
    indoors: {
        label: "Indoors",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

interface UserPieChartProps {
    climbs: Climb[];
}

export function UserPieChart({ climbs }: UserPieChartProps) {
    const [filter, setFilter] = useState("1W");

    const filteredClimbs = useMemo(() => {
        const date = new Date();
        switch (filter) {
            case "1W":
                date.setDate(date.getDate() - 7);
                break;
            case "1M":
                date.setMonth(date.getMonth() - 1);
                break;
            case "3M":
                date.setMonth(date.getMonth() - 3);
                break;
            case "YTD":
                date.setMonth(0);
                break;
            case "1Y":
                date.setFullYear(date.getFullYear() - 1);
                break;
            case "ALL":
                date.setTime(
                    Math.min(
                        ...climbs.map((climb) =>
                            new Date(climb.sendDate).getTime(),
                        ),
                    ),
                );
                break;
        }
        return climbs
            .filter((climb) => new Date(climb.sendDate) >= date)
            .map((climb) => {
                const locationType = locations.find(
                    (location) => location.id === climb.location,
                )?.type;
                return {
                    ...climb,
                    locationType: locationType ?? "Unknown",
                    fill:
                        locationType === "Indoors"
                            ? "var(--color-indoors)"
                            : "var(--color-outdoors)",
                };
            })
            .reduce(
                (
                    acc: {
                        locationType: string;
                        climbs: number;
                        fill: string;
                    }[],
                    curr,
                ) => {
                    const index = acc.findIndex(
                        (item) => item.locationType === curr.locationType,
                    );
                    if (index === -1) {
                        acc.push({
                            locationType: curr.locationType,
                            climbs: 1,
                            fill: curr.fill,
                        });
                    } else {
                        if (acc[index]) {
                            acc[index].climbs += 1;
                        }
                    }
                    return acc;
                },
                [],
            );
    }, [climbs, filter]);

    const totalClimbs = filteredClimbs.reduce(
        (acc, curr) => acc + curr.climbs,
        0,
    );

    return (
        <Card className="flex flex-col border-none bg-secondary">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-sm">
                    Indoor vs Outdoor Climbing Comparison
                </CardTitle>
                <CardDescription>
                    Showing total climbs
                    {filter === "1W" && " for the last 1 Week"}
                    {filter === "1M" && " for the last 1 Month"}
                    {filter === "3M" && " for the last 3 Months"}
                    {filter === "YTD" && " Year to Date"}
                    {filter === "1Y" && " for the last Year"}
                    {filter === "ALL" && " for All Time"}
                </CardDescription>
                <UserChartFilter filter={filter} setFilter={setFilter} />
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={filteredClimbs}
                            dataKey="climbs"
                            nameKey="locationType"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
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
                                                    {totalClimbs.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Climbs
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-center gap-12 text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="h-6 w-6 rounded bg-[hsl(var(--chart-2))]"></div>
                        <div className="">
                            <p className="text-sm text-foreground/50">
                                Indoors
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                                {filteredClimbs.find(
                                    (climb) => climb.locationType === "Indoors",
                                )?.climbs ?? 0}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-6 w-6 rounded bg-[hsl(var(--chart-1))]"></div>
                        <div className="">
                            <p className="text-sm text-foreground/50">
                                Outdoors
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                                {filteredClimbs.find(
                                    (climb) =>
                                        climb.locationType === "Outdoors",
                                )?.climbs ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
