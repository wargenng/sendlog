import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";

import { useState, type ReactNode } from "react";
import DrawerMainContent from "../drawermaincontent";
import { Textarea } from "~/components/ui/textarea";
import { Info } from "lucide-react";
import { BulkLogSubmit } from "./components/bulklogsubmit";
import { LocationsCombobox } from "../locationscombobox";
import { DatePicker } from "../datepicker";
import { SessionTab } from "~/app/_components/climbs/sessiontabs";

interface BulkLogProps {
    children: ReactNode;
}

export default function BulkLogDrawer({ children }: BulkLogProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [bulk, setBulk] = useState("");
    const [session, setSession] = useState({
        location: 0,
        date: new Date(),
    });

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[calc(100dvh-1rem)]">
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle className="flex space-x-1">
                        <p>Bulk Log Climbs</p>
                        <Info className="h-3 w-3" />
                    </DrawerTitle>
                    <DrawerDescription>
                        Log multiple climbs at once.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent isUploading={isUploading}>
                    <div className="space-y-1">
                        <p>Grades *</p>
                        <Textarea
                            className={`h-32 text-base ${isUploading ? "pointer-events-none brightness-50" : ""}`}
                            placeholder="Enter the grade and modifier of each climb. separate each climb with a space."
                            value={bulk}
                            onChange={(e) => setBulk(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 flex gap-2">
                        <div className="w-1/2 space-y-1">
                            <div className="flex justify-between">
                                <p
                                    className={
                                        isRejected && !session.location
                                            ? "text-red-500"
                                            : ""
                                    }
                                >
                                    Location *
                                </p>
                                <div className="italic text-red-500/50">
                                    {isRejected &&
                                        !session.location &&
                                        "Location is required"}
                                </div>
                            </div>
                            <LocationsCombobox
                                location={session.location}
                                setLocation={(location) => {
                                    setSession({
                                        ...session,
                                        location: location,
                                    });
                                }}
                            />
                        </div>
                        <div className="w-1/2 space-y-1">
                            <div className="flex justify-between">
                                <p
                                    className={
                                        isRejected && !session.date
                                            ? "text-red-500"
                                            : ""
                                    }
                                >
                                    Date *
                                </p>
                                <div className="italic text-red-500/50">
                                    {isRejected &&
                                        !session.date &&
                                        "Date is required"}
                                </div>
                            </div>
                            <DatePicker
                                date={session.date}
                                setDate={(date: Date) => {
                                    setSession({
                                        ...session,
                                        date: date,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <SessionTab />
                    <BulkLogSubmit
                        bulk={bulk}
                        setIsUploading={setIsUploading}
                        setOpen={setOpen}
                        location={session.location}
                        date={session.date}
                    />
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerMainContent>
            </DrawerContent>
        </Drawer>
    );
}
