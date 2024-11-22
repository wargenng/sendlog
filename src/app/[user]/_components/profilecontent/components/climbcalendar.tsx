import type { User } from "@clerk/nextjs/server";
import { getProfileUsersClimbs } from "~/server/queries";
import { ClimbCalendarClient } from "./climbcalendarclient";

interface ClimbCalendarProps {
    user: User;
}

export async function ClimbCalendar({ user }: ClimbCalendarProps) {
    const climbs = await getProfileUsersClimbs(user.id);

    return <ClimbCalendarClient climbs={climbs} />;
}
