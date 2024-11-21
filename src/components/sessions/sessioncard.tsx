import type { SessionWithClimbs } from "~/server/queries";
import { SessionCardClient } from "./sessioncardclient";

interface SessionCardProps {
    session: SessionWithClimbs;
    userImage: string;
    userFullName: string;
    userId: string;
}

export async function SessionCard({
    session,
    userImage,
    userFullName,
    userId,
}: SessionCardProps) {
    return (
        <SessionCardClient
            session={session}
            userImage={userImage}
            userFullName={userFullName}
            userId={userId}
        />
    );
}
