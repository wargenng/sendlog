import { getCurrentUsersClimbs } from "~/server/queries";
import { locations } from "../utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";

export async function RecentClimbs() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <div className="space-y-2 p-6">
            <h1 className="border-b text-2xl font-semibold">recent activity</h1>
            <div className="flex flex-col gap-2">
                {climbs.map((climb) => (
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
                        <div className="border-b">
                            <h1>
                                {climb.name} {climb.grade}
                            </h1>
                            {climb.rating ? (
                                <p className="flex items-center text-xl text-primary">
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
                                    <span className="ml-2 text-sm text-foreground/50">
                                        ({climb.rating})
                                    </span>
                                </p>
                            ) : null}
                            {climb.location ? (
                                <p>
                                    {
                                        locations.find(
                                            (location) =>
                                                location.id === climb.location,
                                        )?.label
                                    }
                                </p>
                            ) : null}
                            {climb.sendDate ? (
                                <p>
                                    {climb.sendDate.toLocaleDateString(
                                        undefined,
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        },
                                    )}
                                </p>
                            ) : null}
                            {climb.attempts ? (
                                <p>{climb.attempts} attempts</p>
                            ) : null}
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
