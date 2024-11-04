import { getUsersSessions } from "~/server/queries";

interface HighestGradeProps {
    userId: string;
}

export async function UserSessionAmount({ userId }: HighestGradeProps) {
    const sessions = await getUsersSessions(userId);

    return (
        <div className="w-12">
            <p className="text-xs text-foreground/50">Sessions</p>
            <p className="text-base">{sessions.length}</p>
        </div>
    );
}
