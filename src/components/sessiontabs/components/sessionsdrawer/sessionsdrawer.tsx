import { getUsersSessions } from "~/app/api/sessionActions";
import { SessionDrawerClient } from "./sessiondrawerclient";
import type { Session } from "~/server/db/schema";

interface SessionsDrawerProps {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    sessions: Session[];
}

export function SessionsDrawer({
    sessionId,
    setSessionId,
    sessions,
}: SessionsDrawerProps) {
    return (
        <SessionDrawerClient
            sessionId={sessionId}
            setSessionId={setSessionId}
            sessions={sessions}
        />
    );
}
