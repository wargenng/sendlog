import { getUsersSessions } from "~/server/queries";

interface HighestGradeProps {
    userId: string;
}

export async function UserSessionAmount({ userId }: HighestGradeProps) {
    const sessions = await getUsersSessions(userId);

    return (
        <div className="w-12 text-center">
            <p className="text-base">{sessions.length}</p>
            <p className="text-xs text-foreground/50">sessions</p>
        </div>
    );
}
