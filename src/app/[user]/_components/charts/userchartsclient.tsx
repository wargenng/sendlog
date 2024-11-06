"use client";

import type { Climb } from "~/server/db/schema";
import { UserAreaChart } from "./components/userareachart";
import { UserPieChart } from "./components/userpiechart";

interface UserChartsClientProps {
    climbs: Climb[];
}

export function UserChartsClient({ climbs }: UserChartsClientProps) {
    return (
        <div className="space-y-2">
            <UserAreaChart climbs={climbs} />
            <UserPieChart climbs={climbs} />
        </div>
    );
}
