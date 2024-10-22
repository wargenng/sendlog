import { getUsersClimbsLimited } from "~/server/queries";
import { ClimbCard } from "./climbcard";

interface ProfileClimbsProps {
    user: string;
}

export async function ProfileClimbs({ user }: ProfileClimbsProps) {
    const climbs = await getUsersClimbsLimited(user);

    return (
        <div className="space-y-2">
            <h1 className="text-base font-semibold">recent climbs</h1>
            <div className="flex flex-col gap-2 rounded-lg bg-secondary/50 p-4">
                {climbs.map((climb) => (
                    <ClimbCard
                        climb={climb}
                        isLastCard={climbs.indexOf(climb) !== climbs.length - 1}
                        key={climb.id}
                    />
                ))}
            </div>
        </div>
    );
}
