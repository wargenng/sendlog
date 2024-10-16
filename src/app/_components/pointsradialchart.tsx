/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import type { ChartConfig } from "~/components/ui/chart";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "~/components/ui/chart";
import { grades } from "../utils/grades";
import { locations } from "../utils/locations";

export const description = "An area chart with gradient fill";

const chartConfig = {
    outdoors: {
        label: "Outdoors",
        color: "hsl(var(--chart-1))",
    },
    indoors: {
        label: "Indoors",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function PointsRadialChart(climbs: any) {
    const highestGradeSent = Array.from({ length: 18 }, (_, i) => i).map(
        (grade: any) =>
            climbs.climbs.filter(
                (climb: any) =>
                    grades.find((grade) => grade.label === climb.grade)
                        ?.gradeValue === grade,
            ).length,
    );

    const lastIndexGreaterThanZero =
        highestGradeSent
            .map((count, index) => (count > 0 ? index : -1))
            .filter((index) => index !== -1)
            .pop() ?? 0;

    const climbsData = [
        {
            outdoors: climbs.climbs
                .filter(
                    (climb: any) =>
                        locations.find(
                            (location) => location.id === climb.location,
                        )?.type === "Outdoors",
                )
                .reduce(
                    (sum: number, climb: any) =>
                        sum +
                        (grades.find((grade) => grade.label === climb.grade)
                            ?.gradeValue ?? 0),
                    0,
                ),
            indoors: climbs.climbs
                .filter(
                    (climb: any) =>
                        locations.find(
                            (location) => location.id === climb.location,
                        )?.type === "Indoors",
                )
                .reduce(
                    (sum: number, climb: any) =>
                        sum +
                        (grades.find((grade) => grade.label === climb.grade)
                            ?.gradeValue ?? 0),
                    0,
                ),
        },
    ];

    const totalVisitors = climbs.climbs.reduce(
        (sum: number, climb: any) =>
            sum +
            (grades.find((grade) => grade.label === climb.grade)?.gradeValue ??
                0),
        0,
    );
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total V-points</CardTitle>
                <CardDescription>
                    Total V-points split by location type.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={climbsData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
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
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy ?? 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy ?? 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    V-points
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="outdoors"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-outdoors)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="indoors"
                            fill="var(--color-indoors)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="-mt-20 flex justify-center space-x-8">
                <div className="flex items-center space-x-4">
                    <div className="h-6 w-6 rounded bg-[hsl(var(--chart-2))]"></div>
                    <div>
                        <p className="text-sm text-foreground/50">Indoors</p>
                        <p className="text-2xl font-bold text-foreground">
                            {climbsData[0]?.indoors ?? 0}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-6 w-6 rounded bg-[hsl(var(--chart-1))]"></div>
                    <div>
                        <p className="text-sm text-foreground/50">Outdoors</p>
                        <p className="text-2xl font-bold text-foreground">
                            {climbsData[0]?.outdoors ?? 0}
                        </p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}