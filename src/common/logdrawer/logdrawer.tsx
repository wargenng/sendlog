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

import { useState, type ReactNode } from "react";
import DrawerMainContent from "../drawermaincontent";
import { ClimbDrawer } from "../climbdrawer/climbdrawer";
import { LogButton } from "./components/logbutton";
import SessionDrawer from "../sessiondrawer/sessiondrawer";
import { X } from "lucide-react";

interface LogDrawerProps {
    children: ReactNode;
}

export default function LogDrawer({ children }: LogDrawerProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[calc(100dvh-1rem)]">
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle className="text-2xl">
                        Log an activity
                    </DrawerTitle>
                    <DrawerDescription>
                        Add a new session, climb, goal to your logbook.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent isUploading={isUploading}>
                    <div className="grid grid-cols-2 gap-4">
                        <ClimbDrawer isEdit={false}>
                            <Button
                                variant="secondary"
                                className="relative aspect-square h-40 w-full overflow-hidden text-foreground"
                            >
                                <div
                                    className="duration-250 absolute inset-0 bg-cover bg-center opacity-25 transition-transform hover:scale-110"
                                    style={{
                                        backgroundImage: `url(/climb.jpg)`,
                                    }}
                                ></div>
                                <span className="relative z-10">
                                    Log a climb
                                </span>
                            </Button>
                        </ClimbDrawer>
                        <SessionDrawer isEdit={false}>
                            <Button
                                variant="secondary"
                                className="relative aspect-square h-40 w-full overflow-hidden text-foreground"
                            >
                                <div
                                    className="duration-250 absolute inset-0 bg-cover bg-center opacity-25 transition-transform hover:scale-110"
                                    style={{
                                        backgroundImage: `url(/session.jpg)`,
                                    }}
                                ></div>
                                <span className="relative z-10">
                                    Log a session
                                </span>
                            </Button>
                        </SessionDrawer>
                        <LogButton
                            backgroundImage="/goal.jpg"
                            text="Set a goal"
                        />
                        <LogButton
                            backgroundImage="/group.jpg"
                            text="Create a group session"
                        />
                        <LogButton
                            backgroundImage="/bulk.jpg"
                            text="Bulk log"
                        />
                    </div>
                </DrawerMainContent>
                <DrawerFooter className="mb-4">
                    <DrawerClose className="flex w-full justify-center">
                        <X className="h-10 w-10 text-foreground" />
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
