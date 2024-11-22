import { getCurrentUsersClimbs, getProfileUsersClimbs } from "~/server/queries";
import { ClimbCalendarClient } from "./climbcalendarclient";
import { User } from "@clerk/nextjs/server";

interface ClimbCalendarProps {
    user: User;
}

export async function ClimbCalendar({ user }: ClimbCalendarProps) {
    const climbs = await getProfileUsersClimbs(user.id);

    return <ClimbCalendarClient climbs={climbs} />;
}
