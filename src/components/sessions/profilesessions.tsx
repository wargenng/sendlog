import type { User } from "@clerk/nextjs/server";
import type { SessionWithClimbs } from "~/server/queries";
import { getProfileUsersSessions } from "~/server/queries";
import { SessionCardClient } from "./sessioncardclient";

interface ProfileSessionsProps {
    user: User;
    users: User[];
}

export async function ProfileSessions({ user, users }: ProfileSessionsProps) {
    const sessions = (await getProfileUsersSessions(
        user.id,
    )) as SessionWithClimbs[];

    return (
        <div className="flex flex-col gap-2">
            {sessions.map((session) => {
                const user = users.find(
                    (user: User) => user.id === session.userId,
                );
                if (!user) {
                    return <p key={session.id}>User not found</p>;
                }

                return (
                    <SessionCardClient
                        session={session}
                        key={session.id}
                        userImage={user.imageUrl}
                        userFullName={user.fullName ?? user.username ?? ""}
                        userId={user.id}
                    />
                );
            })}
        </div>
    );
}
