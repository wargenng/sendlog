"use client";

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

import { Info } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SessionTab } from "~/app/_components/climbs/sessiontabs";
import { Textarea } from "~/components/ui/textarea";
import type { Session } from "~/server/db/schema";
import DrawerMainContent from "../drawermaincontent";
import { BulkLogSubmit } from "./components/bulklogsubmit";

interface BulkLogClientProps {
    children: ReactNode;
    sessions: Session[];
}

export default function BulkLogDrawerClient({
    children,
    sessions,
}: BulkLogClientProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [bulk, setBulk] = useState("");
    const [session, setSession] = useState({
        name: `${new Date().toLocaleString("en-US", { weekday: "long" })} ${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Night"} Session`,
        location: 0,
        date: new Date(),
        notes: "",
    } as Session);
    const [sessionId, setSessionId] = useState(
        sessions.at(0)?.id.toString() ?? "",
    );
    const [sessionTabValue, setSessionTabValue] = useState("existing");

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
                    <SessionTab
                        isRejected={isRejected}
                        session={session}
                        setSession={setSession}
                        sessionId={sessionId}
                        setSessionId={setSessionId}
                        sessions={sessions}
                        sessionTabValue={sessionTabValue}
                        setSessionTabValue={setSessionTabValue}
                    />
                    <BulkLogSubmit
                        bulk={bulk}
                        setIsUploading={setIsUploading}
                        setOpen={setOpen}
                        session={session}
                        setIsRejected={setIsRejected}
                        sessionTabValue={sessionTabValue}
                        sessionId={sessionId}
                    />
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerMainContent>
            </DrawerContent>
        </Drawer>
    );
}
