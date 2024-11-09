import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";
import { SessionCard } from "~/app/_components/sessions/sessioncard";
import type { SessionWithClimbs } from "~/server/queries";
import { getCurrentUsersSessionsWithFollowing } from "~/server/queries";
import { SessionCardClient } from "./sessioncardclient";

export async function HomeSessions() {
    const sessions =
        (await getCurrentUsersSessionsWithFollowing()) as SessionWithClimbs[];
    const response = await clerkClient().users.getUserList();
    const users = response.data;

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
