"use client";

import { DrawerTop } from "~/components/drawer/drawertop";
import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";

import { Info } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SessionTab } from "~/components/sessiontabs/sessiontabs";
import type { Climb, Session } from "~/server/db/schema";
import DrawerMainContent from "../drawer/drawermaincontent";
import { BulkLogSubmit } from "./components/bulklogsubmit";
import { ClimbEntry } from "./components/climbentry";

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
    const [climbs, setClimbs] = useState([] as Climb[]);
    const [session, setSession] = useState({} as Session);
    const [sessionId, setSessionId] = useState("");
    const [sessionTabValue, setSessionTabValue] = useState("existing");

    const handleOpen = (open: boolean) => {
        resetValues();
        setOpen(open);
    };

    const resetValues = () => {
        setIsRejected(false);
        setClimbs([] as Climb[]);
        setSession({
            name: `${new Date().toLocaleString("en-US", { weekday: "long" })} ${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Night"} Session`,
            location: 0,
            date: new Date(),
            notes: "",
        } as Session);
        const today = new Date().toDateString();
        const firstSessionDate = sessions.at(0)?.date.toDateString();

        if (firstSessionDate === today) {
            setSessionId(sessions.at(0)?.id.toString() ?? "");
            setSessionTabValue(sessions.at(0)?.id.toString() ?? "existing");
        } else {
            setSessionId("");
            setSessionTabValue("create");
        }
    };

    return (
        <Drawer open={open} onOpenChange={handleOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[calc(100dvh-1rem)]">
                <DrawerTop />
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle className="flex space-x-1">
                        <p>Log a Session</p>
                        <Info className="h-3 w-3" />
                    </DrawerTitle>
                    <DrawerDescription>
                        Log multiple climbs at once.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent isUploading={isUploading}>
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
                    <ClimbEntry climbs={climbs} setClimbs={setClimbs} />
                </DrawerMainContent>
                <DrawerFooter>
                    <BulkLogSubmit
                        bulk={climbs}
                        setIsUploading={setIsUploading}
                        setOpen={handleOpen}
                        session={session}
                        setIsRejected={setIsRejected}
                        sessionTabValue={sessionTabValue}
                        sessionId={sessionId}
                    />
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
