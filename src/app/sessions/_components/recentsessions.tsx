import { ChevronRight } from "lucide-react";
import SessionDrawer from "~/common/sessiondrawer/sessiondrawer";
import { getCurrentUsersSessions } from "~/server/queries";
import type { SessionWithClimbs } from "~/server/queries";
import SessionClimbs from "../../_components/climbs/sessionclimbs";
import { locations } from "../../utils/locations";
import { SessionCard } from "~/app/_components/sessions/sessioncard";

export async function RecentSessions() {
    const sessions = (await getCurrentUsersSessions()) as SessionWithClimbs[];

    return (
        <div className="space-y-2">
            <h1 className="text-base font-bold">recent sessions</h1>
            <div className="flex flex-col gap-2">
                {sessions.map((session) => (
                    <SessionDrawer
                        climbs={SessionClimbs(session.id)}
                        session={session}
                        key={session.id}
                    >
                        <SessionCard session={session} />
                    </SessionDrawer>
                ))}
            </div>
        </div>
    );
}
