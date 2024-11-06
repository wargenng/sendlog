import { User } from "@clerk/nextjs/server";
import { eachWeekOfInterval, startOfWeek, subMonths } from "date-fns";
import { getUsersClimbs } from "~/server/queries";
import { UserChartsClient } from "./userchartsclient";

interface UserChartsProps {
    user: User;
}

export async function UserCharts({ user }: UserChartsProps) {
    const climbs = await getUsersClimbs(user.id);

    return <UserChartsClient climbs={climbs} />;
}
