import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { ClimbDrawer } from "~/components/climbdrawer/climbdrawer";
import type { Climb } from "~/server/db/schema";
import { locations } from "../../app/utils/locations";
import { ClimbDetails } from "./climbdetails";

interface ClimbCardProps {
    climb: Climb;
    isProfile?: boolean;
}

export function ClimbCard({ climb, isProfile }: ClimbCardProps) {
    return (
        <div className="relative w-full">
            <ClimbDetails climb={climb}>
                <div
                    className={`flex w-full items-center gap-4 overflow-hidden bg-secondary text-left`}
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
                <ClimbDrawer climb={climb}>
                    <Ellipsis
                        className="absolute right-4 top-4 text-foreground/50"
                        size={20}
                    />
                </ClimbDrawer>
            ) : null}
        </div>
    );
}
