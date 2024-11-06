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
        (
            acc: Record<
                string,
                {
                    climbs: number;
                    sessions: Set<string>;
                    locations: Set<string>;
                }
            >,
            climb,
        ) => {
            const weekStart = startOfWeek(new Date(climb.sendDate));
            const weekStartStr = weekStart.toISOString();
            if (!acc[weekStartStr]) {
                acc[weekStartStr] = {
                    climbs: 0,
                    sessions: new Set(),
                    locations: new Set(),
                };
            }
            acc[weekStartStr].climbs++;
            if (climb.sessionId) {
                acc[weekStartStr].sessions.add(climb.sessionId);
            }
            acc[weekStartStr].locations.add(climb.location.toString());
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
        const weekData = climbsByWeek[weekStr] ?? {
            climbs: 0,
            sessions: new Set(),
            locations: new Set(),
        };
        return {
            week,
            climbs: weekData.climbs,
            sessions: weekData.sessions.size,
            locations: weekData.locations.size,
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
