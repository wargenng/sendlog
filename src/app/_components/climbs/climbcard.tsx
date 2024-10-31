import { locations } from "../../utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";
import { ClimbDetails } from "./climbdetails";
import { ChevronRight } from "lucide-react";
import type { Climb } from "~/server/db/schema";
import Image from "next/image";

interface ClimbCardProps {
    climb: Climb;
    isLastCard: boolean;
}

export function ClimbCard({ climb, isLastCard }: ClimbCardProps) {
    return (
        <ClimbDetails climb={climb}>
            <div
                className={`flex w-full items-center gap-4 text-left ${isLastCard ? "border-b border-foreground/10" : ""}`}
            >
                <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={
                        locations[climb.location - 1]?.image ||
                        "/path/to/default/image.jpg"
                    }
                    alt="location image"
                    width={48}
                    height={48}
                />
                <div className={`w-full space-y-1`}>
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
                            ? new Date(climb.sendDate).toLocaleDateString(
                                  "en-US",
                              )
                            : ""}
                    </p>
                </div>
            </div>
        </ClimbDetails>
    );
}
