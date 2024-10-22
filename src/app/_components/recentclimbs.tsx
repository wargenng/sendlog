import { getCurrentUsersClimbs } from "~/server/queries";
import { locations } from "../utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";
import { ChevronRight } from "lucide-react";

export async function RecentClimbs() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <div className="space-y-2">
            <h1 className="text-base font-semibold">recent activity</h1>
            <div className="flex flex-col gap-2 rounded-lg bg-secondary/50 p-4">
                {climbs.map((climb) => (
                    <ClimbDrawer isEdit={true} climb={climb} key={climb.id}>
                        <div
                            className={`space-y-1 ${climbs.indexOf(climb) !== climbs.length - 1 ? "border-b border-foreground/15" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-lg font-semibold">
                                        {climb.name} {climb.grade}
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div>
                                        {climb.rating ? (
                                            <p className="flex items-center text-base text-primary">
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
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-foreground/50" />
                                </div>
                            </div>

                            <p className="text-xs text-foreground/50">
                                {locations[climb.location - 1]?.label} ·{" "}
                                {locations[climb.location - 1]?.location},{" "}
                                {locations[climb.location - 1]?.state}
                            </p>
                            <p className="pb-2 text-xs text-foreground/50">
                                {climb.sendDate
                                    ? new Date(
                                          climb.sendDate,
                                      ).toLocaleDateString("en-US")
                                    : ""}
                            </p>
                        </div>
                    </ClimbDrawer>
                ))}
            </div>
        </div>
    );
}
