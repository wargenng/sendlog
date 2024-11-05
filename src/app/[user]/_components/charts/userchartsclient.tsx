"use client";

import { useState } from "react";
import { UserAreaChart } from "./userareachart";
import { UserChartFilter } from "./userchartfilter";
import { UserPieChart } from "./userpiechart";

export function UserChartsClient() {
    const [filter, setFilter] = useState("Week");

    return (
        <div className="space-y-2">
            <UserChartFilter filter={filter} setFilter={setFilter} />
            <UserAreaChart />
            <UserPieChart />
        </div>
    );
}
