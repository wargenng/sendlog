import { locations } from "../../utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";
import { ChevronRight } from "lucide-react";
import type { Climb } from "~/server/db/schema";

interface ClimbCardProps {
    climb: Climb;
    isLastCard: boolean;
}

export function ClimbCard({ climb, isLastCard }: ClimbCardProps) {
    return (
        <ClimbDrawer climb={climb}>
            <div
                className={`space-y-1 ${isLastCard ? "border-b border-foreground/15" : ""}`}
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
                        ? new Date(climb.sendDate).toLocaleDateString("en-US")
                        : ""}
                </p>
            </div>
        </ClimbDrawer>
    );
}
