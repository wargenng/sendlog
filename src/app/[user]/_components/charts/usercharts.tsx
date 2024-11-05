import { clerkClient, User } from "@clerk/nextjs/server";
import { UserChartsClient } from "./userchartsclient";
import { getUsersClimbs } from "~/server/queries";
import { startOfWeek, subMonths, eachWeekOfInterval } from "date-fns";

interface UserChartsProps {
    username: string;
}

export async function UserCharts({ username }: UserChartsProps) {
    const response = await clerkClient().users.getUserList();
    const users = response.data;
    const user = users.find((user: User) => user.username === username);
    if (!user) {
        return <p>User not found</p>;
    }
    const climbs = await getUsersClimbs(user.id);

    const threeMonthsAgo = subMonths(new Date(), 3);
    const climbsFromPastThreeMonths = climbs.filter(
        (climb) => new Date(climb.sendDate) >= threeMonthsAgo,
    );

    const climbsByWeek = climbsFromPastThreeMonths.reduce(
        (acc: Record<string, number>, climb) => {
            const weekStart = startOfWeek(new Date(climb.sendDate));
            const weekStartStr = weekStart.toISOString();
            if (!acc[weekStartStr]) {
                acc[weekStartStr] = 0;
            }
            acc[weekStartStr]++;
            return acc;
        },
        {},
    );

    const weeks = eachWeekOfInterval({
        start: startOfWeek(threeMonthsAgo),
        end: new Date(),
    });

    const climbsByWeekArray = weeks.map((week) => {
        const weekStr = week.toISOString();
        return {
            week,
            climbs: climbsByWeek[weekStr] || 0,
        };
    });

    // Sort the climbsByWeekArray by week in ascending order (oldest first)
    climbsByWeekArray.sort((a, b) => a.week.getTime() - b.week.getTime());

    console.log(climbsByWeekArray);

    return (
        <UserChartsClient
            climbs={climbsFromPastThreeMonths}
            climbsByWeek={climbsByWeekArray}
        />
    );
}
