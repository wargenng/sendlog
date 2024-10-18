import { getCurrentUsersClimbs } from "~/server/queries";
import { locations } from "../utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";

export async function RecentClimbs() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <div className="space-y-2">
            <h1 className="border-b text-base font-semibold">
                recent activity
            </h1>
            <div className="flex flex-col gap-2">
                {climbs
                    .sort(
                        (a, b) =>
                            new Date(b.sendDate ?? 0).getTime() -
                            new Date(a.sendDate ?? 0).getTime(),
                    )
                    .map((climb) => (
                        <ClimbDrawer
                            isEdit={true}
                            id={climb.id}
                            name={climb.name ?? ""}
                            grade={climb.grade ?? ""}
                            rating={climb.rating ?? 0}
                            location={climb.location ?? -1}
                            attempts={climb.attempts ?? 0}
                            notes={climb.notes ?? ""}
                            date={climb.sendDate ?? new Date()}
                            key={climb.id}
                        >
                            <div className="space-y-2 border-b">
                                <div className="flex justify-between">
                                    <p className="text-xs font-thin">
                                        {locations[climb.location - 1]?.label} ·{" "}
                                        {
                                            locations[climb.location - 1]
                                                ?.location
                                        }
                                        , {locations[climb.location - 1]?.state}
                                    </p>
                                    <p className="text-xs text-foreground/50">
                                        {climb.sendDate
                                            ? new Date(
                                                  climb.sendDate,
                                              ).toLocaleDateString("en-US")
                                            : ""}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <h1 className="text-2xl font-semibold">
                                        {climb.name} {climb.grade}
                                    </h1>
                                    <div>
                                        {climb.rating ? (
                                            <p className="flex items-center text-xs text-primary">
                                                {"★".repeat(climb.rating)}
                                                {"★"
                                                    .repeat(5 - climb.rating)
                                                    .split("")
                                                    .map((star, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-foreground/50"
                                                        >
                                                            {star}
                                                        </span>
                                                    ))}{" "}
                                            </p>
                                        ) : null}
                                        {climb.attempts ? (
                                            <p className="text-xs italic text-foreground/50">
                                                {climb.attempts} attempts
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <p className="italic text-foreground/50">
                                    {climb.notes}
                                </p>
                            </div>
                        </ClimbDrawer>
                    ))}
            </div>
        </div>
    );
}
