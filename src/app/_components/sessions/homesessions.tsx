import { SessionCard } from "~/app/_components/sessions/sessioncard";
import type { SessionWithClimbs } from "~/server/queries";
import { getCurrentUsersSessionsWithFollowing } from "~/server/queries";

export async function HomeSessions() {
    const sessions =
        (await getCurrentUsersSessionsWithFollowing()) as SessionWithClimbs[];

    return (
        <div className="flex flex-col gap-2">
            {sessions.map((session) => (
                <SessionCard session={session} key={session.id} />
            ))}
        </div>
    );
}
