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

interface BulkLogProps {
    children: ReactNode;
}

export default function BulkLogDrawer({ children }: BulkLogProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [bulk, setBulk] = useState("");

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
                    <Textarea
                        className={`h-96 ${isUploading ? "pointer-events-none brightness-50" : ""}`}
                        placeholder="Enter the grade and modifier of each climb. separate each climb with a space."
                        value={bulk}
                        onChange={(e) => setBulk(e.target.value)}
                    ></Textarea>
                    <BulkLogSubmit
                        bulk={bulk}
                        setIsUploading={setIsUploading}
                        setOpen={setOpen}
                        location={1}
                        date={new Date()}
                    />
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerMainContent>
            </DrawerContent>
        </Drawer>
    );
}
