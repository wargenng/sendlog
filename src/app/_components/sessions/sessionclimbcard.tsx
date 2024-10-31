import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { locations } from "~/app/utils/locations";
import { ClimbDrawer } from "~/common/climbdrawer/climbdrawer";
import type { Climb } from "~/server/db/schema";
import { ClimbDetails } from "../climbs/climbdetails";

export function SessionClimbCard({ climb }: { climb: Climb }) {
    const location = locations.find(
        (location) => location.id === climb.location,
    );

    return (
        <div className="flex w-full items-center gap-4 pl-4">
            <ClimbDetails climb={climb}>
                <div className="flex w-full items-center gap-4">
                    <Image
                        className="h-12 w-12 object-cover"
                        src={location?.image ?? "/path/to/default/image.jpg"}
                        alt="location image"
                        width={48}
                        height={48}
                    />
                    <div className="flex grow flex-col gap-1">
                        <p className="text-sm">
                            {climb.name} {climb.grade}
                        </p>
                        <p className="text-xs text-foreground/50">
                            {location?.label}
                        </p>
                    </div>
                </div>
            </ClimbDetails>

            <ClimbDrawer climb={climb}>
                <Ellipsis size={20} />
            </ClimbDrawer>
        </div>
    );
}
