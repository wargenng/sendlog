import { getUsersClimbs } from "~/server/queries";

interface HighestGradeProps {
    userId: string;
}

export async function UserClimbsAmount({ userId }: HighestGradeProps) {
    const climbs = await getUsersClimbs(userId);

    return (
        <div className="w-12 text-center">
            <p className="text-base">{climbs.length}</p>
            <p className="text-xs text-foreground/50">climbs</p>
        </div>
    );
}
