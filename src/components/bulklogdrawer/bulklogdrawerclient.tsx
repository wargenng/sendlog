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
import { SessionTab } from "~/components/climbs/sessiontabs";
import type { Climb, Session } from "~/server/db/schema";
import DrawerMainContent from "../drawer/drawermaincontent";
import { GradePickerSheet } from "../gradepickersheet/gradepickersheet";
import { BulkLogSubmit } from "./components/bulklogsubmit";
import { GradeScrollable } from "../gradesscrollable/gradescrollable";
import { Label } from "~/components/ui/label";
import { Card } from "~/components/ui/card";

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
        setSessionId(sessions.at(0)?.id.toString() ?? "");
        setSessionTabValue("existing");
    };

    return (
        <Drawer open={open} onOpenChange={handleOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[calc(100dvh-1rem)]">
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
                    <Card className="w-full space-y-2 p-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold">Climbs</h1>
                            <Label
                                className={`${climbs.length > 0 ? "brightness-100" : "brightness-50"}`}
                            >
                                {climbs.length}
                            </Label>
                        </div>
                        <GradeScrollable
                            climbs={climbs}
                            setClimbs={setClimbs}
                        />
                        <div className="flex gap-4">
                            <GradePickerSheet
                                climbs={climbs}
                                setClimbs={setClimbs}
                            >
                                <Button
                                    variant="none"
                                    className="flex space-x-1 rounded-md border p-4"
                                >
                                    <Plus size={16} />
                                    <span>Add Climbs</span>{" "}
                                </Button>
                            </GradePickerSheet>
                            <Button
                                variant="none"
                                className="flex space-x-1 rounded-md border p-4"
                                onClick={() => setClimbs([])}
                            >
                                <CircleX size={16} />
                                <span>Clear All</span>
                            </Button>
                        </div>
                    </Card>
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
