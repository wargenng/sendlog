import { SessionCard } from "~/app/_components/sessions/sessioncard";
import type { SessionWithClimbs } from "~/server/queries";
import {
    getCurrentUsersSessions,
    getCurrentUsersSessionsWithFollowing,
} from "~/server/queries";

export async function HomeSessions() {
    const sessions =
        (await getCurrentUsersSessionsWithFollowing()) as SessionWithClimbs[];

    return (
        <div className="space-y-2">
            <div className="flex flex-col gap-4">
                {sessions.map((session) => (
                    <SessionCard session={session} key={session.id} />
                ))}
            </div>
        </div>
    );
}
