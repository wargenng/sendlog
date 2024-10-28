import { getCurrentUsersClimbs } from "~/server/queries";
import { ClimbCalendarClient } from "./climbcalendarclient";

export async function ClimbCalendar() {
    const climbs = await getCurrentUsersClimbs();

    return <ClimbCalendarClient climbs={climbs} />;
}
