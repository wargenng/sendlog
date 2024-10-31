import { locations } from "~/app/utils/locations";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { Climb } from "~/server/db/schema";
import Image from "next/image";

interface ClimbDrawerProps {
    children: React.ReactNode;
    climb: Climb;
    sessionId?: number;
}
export function ClimbDetails({ children, climb, sessionId }: ClimbDrawerProps) {
    const location = locations.find(
        (location) => location.id === climb.location,
    );

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Climb Details</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="relative h-96 overflow-hidden rounded-lg p-4">
                    <div className="absolute inset-0 opacity-50 blur-md">
                        <Image
                            src={location?.image || "/default-image.jpg"}
                            alt={location?.label || "Climb location"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
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
            </SheetContent>
        </Sheet>
    );
}
