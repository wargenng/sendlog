import { getCurrentUsersClimbs } from "~/server/queries";
import { SessionCalendarClient } from "./sessioncalendarclient";

export async function SessionCalendar() {
    const climbs = await getCurrentUsersClimbs();

    return <SessionCalendarClient climbs={climbs} />;
}
