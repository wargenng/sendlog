"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export function GradeAreaChart(climbs: any) {
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

    const climbsData = Array.from(
        { length: lastIndexGreaterThanZero + 1 },
        (_, i) => i,
    ).map((grade: any) => ({
        grade: "V" + grade.toString(),
        outdoors: climbs.climbs.filter(
            (climb: any) =>
                grades.find((grade) => grade.label === climb.grade)
                    ?.gradeValue === grade &&
                locations.find((location) => location.id === climb.location)
                    ?.type === "Outdoors",
        ).length,
        indoors: climbs.climbs.filter(
            (climb: any) =>
                grades.find((grade) => grade.label === climb.grade)
                    ?.gradeValue === grade &&
                locations.find((location) => location.id === climb.location)
                    ?.type === "Indoors",
        ).length,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Climbing Grades Distribution</CardTitle>
                <CardDescription>Indoor vs Outdoor</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={climbsData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="grade"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="outdoors"
                            fill="var(--color-outdoors)"
                            radius={4}
                        />
                        <Bar
                            dataKey="indoors"
                            fill="var(--color-indoors)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total climbs sent by grade and location.
                </div>
            </CardFooter>
        </Card>
    );
}
