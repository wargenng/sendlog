"use client";

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

import { CircleX, Eraser, Info, Plus, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SessionTab } from "~/app/_components/climbs/sessiontabs";
import type { Session } from "~/server/db/schema";
import DrawerMainContent from "../drawermaincontent";
import { GradePickerSheet } from "../gradepickersheet/gradepickersheet";
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
    const [bulk, setBulk] = useState<string[]>([]);
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

    const handleClose = () => {
        setIsRejected(false);
        setBulk([]);
        setOpen(false);
    };

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
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <p>Climbs *</p>
                        </div>
                        {bulk.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {bulk.map((climb, i) => (
                                    <Button
                                        key={climb + i}
                                        className="flex space-x-1 rounded-lg bg-primary/50 p-2 text-foreground"
                                        onClick={() => {
                                            setBulk(
                                                bulk.filter(
                                                    (_, index) => index !== i,
                                                ),
                                            );
                                        }}
                                        variant="none"
                                    >
                                        <p>{climb}</p>
                                        <X className="h-4 w-4" />
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex w-full items-center text-muted-foreground">
                                no climbs added
                            </div>
                        )}
                        <div className="flex gap-4">
                            <GradePickerSheet bulk={bulk} setBulk={setBulk}>
                                <Button
                                    variant="none"
                                    className="flex space-x-1 p-0"
                                >
                                    <Plus size={16} />
                                    <span>Add Climbs</span>{" "}
                                </Button>
                            </GradePickerSheet>
                            <Button
                                variant="none"
                                className="flex space-x-1 p-0"
                                onClick={() => setBulk([])}
                            >
                                <CircleX size={16} />
                                <span>Clear All</span>
                            </Button>
                        </div>
                    </div>
                </DrawerMainContent>
                <DrawerFooter>
                    <BulkLogSubmit
                        bulk={bulk}
                        setIsUploading={setIsUploading}
                        setOpen={handleClose}
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
