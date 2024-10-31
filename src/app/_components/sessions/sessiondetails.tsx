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
import { SessionWithClimbs } from "~/server/queries";

interface SessionDrawerProps {
    children: React.ReactNode;
    session: SessionWithClimbs;
}
export function ClimbDetails({ children, session }: SessionDrawerProps) {
    const location = locations.find(
        (location) => location.id === session.location,
    );

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Session Details</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="relative h-96 overflow-hidden rounded-lg p-4">
                    <div className="absolute inset-0 opacity-50 blur-md">
                        <Image
                            src={location?.image ?? "/default-image.jpg"}
                            alt={location?.label ?? "Session location"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
