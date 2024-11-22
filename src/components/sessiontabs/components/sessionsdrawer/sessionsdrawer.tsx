import type { Session } from "~/server/db/schema";
import { SessionDrawerClient } from "./sessiondrawerclient";

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
