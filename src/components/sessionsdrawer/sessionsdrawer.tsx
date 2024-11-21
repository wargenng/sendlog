import { getUsersSessions } from "~/app/api/sessionActions";
import { SessionDrawerClient } from "./sessiondrawerclient";
import type { Session } from "~/server/db/schema";

interface SessionDrawerProps {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    sessions: Session[];
}

export function SessionDrawer({
    sessionId,
    setSessionId,
    sessions,
}: SessionDrawerProps) {
    return (
        <SessionDrawerClient
            sessionId={sessionId}
            setSessionId={setSessionId}
            sessions={sessions}
        />
    );
}
