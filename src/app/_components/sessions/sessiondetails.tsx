import { locations } from "~/app/utils/locations";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import Image from "next/image";
import type { SessionWithClimbs } from "~/server/queries";
import { Climb } from "~/server/db/schema";
import { SessionClimbCard } from "./sessionclimbcard";

interface SessionDetailsProps {
    children: React.ReactNode;
    session: SessionWithClimbs;
}
export function SessionDetails({ children, session }: SessionDetailsProps) {
    const location = locations.find(
        (location) => location.id === session.location,
    );

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-full">
                <div className="fixed left-0 top-0 h-3/4 w-full overflow-hidden">
                    <div className="absolute inset-0 opacity-50 blur-md">
                        <Image
                            src={location?.image ?? "/default-image.jpg"}
                            alt={location?.label ?? "Session location"}
                            layout="fill"
                            objectFit="cover"
                            className="absolute h-full w-full -translate-y-10 rounded-lg"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
                </div>
                <SheetHeader className="relative">
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                    <div className="relative flex w-full justify-center">
                        <Image
                            src={location?.image ?? "/default-image.jpg"}
                            alt={location?.label ?? "Session location"}
                            width={384}
                            height={384}
                            className="h-72 w-72 shadow-lg"
                        />
                    </div>
                    <div className="relative w-full">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">
                                {session.name}
                            </h1>
                        </div>
                        <p className="text-xs text-foreground/50">
                            {new Date(session.date).toLocaleDateString()} ·{" "}
                            {location?.label}
                        </p>
                    </div>
                    <div
                        className={`relative flex flex-col gap-4 overflow-hidden transition-all duration-500`}
                    >
                        <h1 className="text-lg font-semibold">Climbs</h1>
                        {session.climbs.map((climb: Climb) => (
                            <SessionClimbCard climb={climb} key={climb.id} />
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
