"use client";

import { useState } from "react";
import { UserAreaChart } from "./components/userareachart";
import { UserChartFilter } from "./components/userchartfilter";
import { UserPieChart } from "./components/userpiechart";
import type { Climb } from "~/server/db/schema";

interface UserChartsClientProps {
    climbs: Climb[];
    climbsByWeek: {
        week: Date;
        climbs: number;
        sessions: number;
        locations: number;
    }[];
}

export function UserChartsClient({
    climbs,
    climbsByWeek,
}: UserChartsClientProps) {
    const [filter, setFilter] = useState("1M");

    return (
        <div className="">
            <UserChartFilter filter={filter} setFilter={setFilter} />
            <UserAreaChart climbsByWeek={climbsByWeek} />
            <UserPieChart />
        </div>
    );
}
