import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { locations } from "~/app/utils/locations";
import { Climb } from "~/server/db/schema";
import { SessionWithClimbs } from "~/server/queries";

interface SessionCardProps {
    session: SessionWithClimbs;
}

export function SessionCard({ session }: SessionCardProps) {
    const location = locations.find(
        (location) => location.id === session.location,
    );

    return (
        <div
            className={`flex w-full items-center gap-2 overflow-hidden text-left`}
        >
            <Image
                className="h-20 w-20 object-cover"
                src={location?.image ?? "/path/to/default/image.jpg"}
                alt="location image"
                width={96}
                height={96}
            />
            <div className={`relative w-full space-y-1 p-2`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-base">{session.name}</h1>
                    <ChevronRight className="h-6 w-6 text-foreground/50" />
                </div>
                <p className="text-xs text-foreground/50">
                    Session ·{" "}
                    {new Date(session.date).toLocaleDateString("en-US")}
                </p>
                <p className="text-xs text-foreground/50">
                    {location?.label} · {location?.location}, {location?.state}
                </p>
            </div>
        </div>
    );
}
