import type { SessionWithClimbs } from "~/server/queries";
import { SessionCardClient } from "./sessioncardclient";
import { clerkClient, User } from "@clerk/nextjs/server";

interface SessionCardProps {
    session: SessionWithClimbs;
}

export async function SessionCard({ session }: SessionCardProps) {
    const response = await clerkClient().users.getUserList();
    const users = response.data;
    const user = users.find((user: User) => user.id === session.userId);
    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <SessionCardClient
            session={session}
            userImage={user.imageUrl}
            userFullName={user.fullName ?? user.username ?? ""}
        />
    );
}
