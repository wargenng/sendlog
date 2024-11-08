import { User } from "@clerk/nextjs/server";
import { SessionCard } from "~/app/_components/sessions/sessioncard";
import type { SessionWithClimbs } from "~/server/queries";
import { getProfileUsersSessions } from "~/server/queries";

interface ProfileSessionsProps {
    user: User;
}

export async function ProfileSessions({ user }: ProfileSessionsProps) {
    const sessions = (await getProfileUsersSessions(
        user.id,
    )) as SessionWithClimbs[];

    return (
        <div className="flex flex-col gap-2">
            {sessions.map((session) => (
                <SessionCard session={session} key={session.id} />
            ))}
        </div>
    );
}
