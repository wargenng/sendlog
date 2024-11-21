import { getUsersSessions } from "~/app/api/sessionActions";
import { SessionSheetClient } from "./sessionsheetclient";
import type { Session } from "~/server/db/schema";

interface SessionSheetProps {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    sessions: Session[];
}

export function SessionSheet({
    sessionId,
    setSessionId,
    sessions,
}: SessionSheetProps) {
    return (
        <SessionSheetClient
            sessionId={sessionId}
            setSessionId={setSessionId}
            sessions={sessions}
        />
    );
}
