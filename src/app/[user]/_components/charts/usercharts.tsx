import { User } from "@clerk/nextjs/server";
import { eachWeekOfInterval, startOfWeek, subMonths } from "date-fns";
import { getUsersClimbs } from "~/server/queries";
import { UserChartsClient } from "./userchartsclient";

interface UserChartsProps {
    user: User;
}

export async function UserCharts({ user }: UserChartsProps) {
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

    return (
        <UserChartsClient
            climbs={climbsFromPastThreeMonths}
            climbsByWeek={climbsByWeekArray}
        />
    );
}
