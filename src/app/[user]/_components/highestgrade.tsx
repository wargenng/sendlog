import { getUsersHighestGrade } from "~/server/queries";

interface HighestGradeProps {
    userId: string;
}

export async function HighestGrade({ userId }: HighestGradeProps) {
    const grade = await getUsersHighestGrade(userId);

    return (
        <div className="w-12 text-center">
            <p className="text-base">{grade}</p>
            <p className="text-xs text-foreground/50">grade</p>
        </div>
    );
}
