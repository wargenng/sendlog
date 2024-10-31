import { getLimitedCurrentUsersClimbs } from "~/server/queries";
import { ClimbCard } from "./climbcard";

export async function RecentClimbs() {
    const climbs = await getLimitedCurrentUsersClimbs();

    return (
        <div className="space-y-2">
            <h1 className="text-base font-semibold">recent climbs</h1>
            <div className="flex flex-col gap-2 rounded-lg">
                {climbs.map((climb) => (
                    <ClimbCard climb={climb} key={climb.id} />
                ))}
            </div>
        </div>
    );
}
