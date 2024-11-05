"use client";

import { useState } from "react";
import { UserAreaChart } from "./userareachart";
import { UserChartFilter } from "./userchartfilter";
import { UserPieChart } from "./userpiechart";
import { Climb } from "~/server/db/schema";

interface UserChartsClientProps {
    climbs: Climb[];
}

export function UserChartsClient({ climbs }: UserChartsClientProps) {
    const [filter, setFilter] = useState("Week");

    return (
        <div className="space-y-2">
            <UserChartFilter filter={filter} setFilter={setFilter} />
            <UserAreaChart />
            <UserPieChart />
        </div>
    );
}
