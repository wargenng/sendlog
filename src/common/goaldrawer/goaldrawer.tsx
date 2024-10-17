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

interface GoalDrawerProps {
    children: ReactNode;
}

export default function GoalDrawer({ children }: GoalDrawerProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[calc(100dvh-1rem)]">
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle>Create a new session</DrawerTitle>
                    <DrawerDescription>
                        Add a new session to your logbook.
                    </DrawerDescription>
                </DrawerHeader>
                <div
                    className={`flex flex-col gap-2 overflow-y-auto p-4 text-sm ${
                        isUploading ? "pointer-events-none brightness-50" : ""
                    }`}
                >
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
