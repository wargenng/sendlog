import { locations } from "~/app/utils/locations";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import Image from "next/image";
import type { SessionWithClimbs } from "~/server/queries";
import type { Climb } from "~/server/db/schema";
import { SessionClimbCard } from "./sessionclimbcard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { DrawerRight } from "../drawer/drawerright";

interface SessionDetailsProps {
    children: React.ReactNode;
    session: SessionWithClimbs;
}

export function SessionDetails({ children, session }: SessionDetailsProps) {
    const location = locations.find(
        (location) => location.id === session.location,
    );

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <ScrollArea className="h-full pb-10">
                    <div className="pointer-events-none fixed left-0 top-0 h-3/4 w-full overflow-hidden">
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
                    <DrawerRight />
                    <DrawerHeader className="relative">
                        <DrawerTitle></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
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
                                <SessionClimbCard
                                    climb={climb}
                                    isEditable={false}
                                    key={climb.id}
                                />
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
