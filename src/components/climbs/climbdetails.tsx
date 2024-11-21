import { locations } from "~/app/utils/locations";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import type { Climb } from "~/server/db/schema";
import Image from "next/image";
import { ScrollArea } from "~/components/ui/scroll-area";
import { DrawerRight } from "../drawer/drawerright";

interface ClimbDetailsProps {
    children: React.ReactNode;
    climb: Climb;
}
export function ClimbDetails({ children, climb }: ClimbDetailsProps) {
    const location = locations.find(
        (location) => location.id === climb.location,
    );

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <ScrollArea className="h-full pb-10">
                    <DrawerRight />
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
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background"></div>
                    </div>
                    <DrawerHeader className="mt-2">
                        <DrawerTitle>Climb Details</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>

                    <div className="relative h-96 overflow-hidden rounded-lg p-4">
                        <div className="relative space-y-1">
                            <h1 className="text-lg font-semibold">
                                {climb.name} {climb.grade}
                            </h1>
                        </div>
                        <div className="relative space-y-1">
                            <p className="text-xs text-foreground/50">
                                {climb.sendDate
                                    ? `Sent on ${new Date(climb.sendDate).toLocaleDateString()}`
                                    : "Not sent"}
                            </p>
                            <p className="text-xs text-foreground/50">
                                {location?.label}
                            </p>
                            <p className="text-xs text-foreground/50">
                                {climb.notes}
                            </p>
                        </div>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
