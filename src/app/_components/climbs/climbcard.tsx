import { locations } from "../../utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";
import { ClimbDetails } from "./climbdetails";
import { ChevronRight, Ellipsis } from "lucide-react";
import type { Climb } from "~/server/db/schema";
import Image from "next/image";

interface ClimbCardProps {
    climb: Climb;
    isLastCard: boolean;
    isProfile?: boolean;
}

export function ClimbCard({ climb, isLastCard, isProfile }: ClimbCardProps) {
    return (
        <div className="relative w-full">
            <ClimbDetails climb={climb}>
                <div
                    className={`flex w-full items-center gap-4 overflow-hidden rounded-lg bg-secondary text-left ${isLastCard ? "" : ""}`}
                >
                    <Image
                        className="h-24 w-24 object-cover"
                        src={
                            locations[climb.location - 1]?.image ??
                            "/path/to/default/image.jpg"
                        }
                        alt="location image"
                        width={96}
                        height={96}
                    />
                    <div className={`w-full space-y-1 pr-4`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <h1 className="text-xs font-semibold">
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
                                </div>
                            </div>
                            <div className="flex items-center space-x-2"></div>
                        </div>
                        <p className="text-xs text-foreground/50">
                            {locations[climb.location - 1]?.label} ·{" "}
                            {locations[climb.location - 1]?.location},{" "}
                            {locations[climb.location - 1]?.state}
                        </p>
                        <p className="pb-2 text-xs text-foreground/50">
                            {climb.sendDate
                                ? new Date(climb.sendDate).toLocaleDateString(
                                      "en-US",
                                  )
                                : ""}
                        </p>
                    </div>
                </div>
            </ClimbDetails>
            {!isProfile ? (
                <ClimbDrawer>
                    <Ellipsis className="absolute right-4 top-4 h-4 w-4 text-foreground/50" />
                </ClimbDrawer>
            ) : null}
        </div>
    );
}
