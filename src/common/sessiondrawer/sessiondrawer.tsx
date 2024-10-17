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
import { Input } from "~/components/ui/input";
import DrawerMainContent from "../drawermaincontent";
import { LocationsCombobox } from "../locationscombobox";
import { Textarea } from "~/components/ui/textarea";
import { DatePicker } from "../datepicker";
import { ClimbDrawer } from "../climbdrawer/climbdrawer";
import { useRouter } from "next/navigation";
import { LoadingAnimation } from "~/components/loadinganimation";
import { addSession, editSession } from "~/app/api/climbActions";

interface SessionDrawerProps {
    children: ReactNode;
    isEdit?: boolean;
    name?: string;
    location?: number;
    notes?: string;
    date?: Date;
    id?: number;
}

export default function SessionDrawer({
    children,
    isEdit = false,
    name: initialName = "",
    location: initialLocation = 0,
    notes: initialNotes = "",
    date: initialDate = new Date(),
    id: sessionId,
}: SessionDrawerProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [name, setName] = useState(() => {
        if (initialName) {
            return initialName;
        }
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    });
    const [location, setLocation] = useState(initialLocation || 0);
    const [notes, setNotes] = useState(initialNotes || "");
    const [date, setDate] = useState<Date>(initialDate || new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent
                className={`h-[calc(100dvh-1rem)] ${isSubmitting ? "pointer-events-none" : ""}`}
            >
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle>
                        {isEdit ? "Edit session" : "Create a new session"}
                    </DrawerTitle>
                    <DrawerDescription>
                        {isEdit
                            ? "Edit your session details."
                            : "Add a new session to your logbook."}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent isUploading={isUploading}>
                    <div className="space-y-1">
                        <p>Session Name</p>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-base"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1/2 space-y-1">
                            <p>Location</p>
                            <LocationsCombobox
                                location={location}
                                setLocation={setLocation}
                            />
                        </div>
                        <div className="w-1/2 space-y-1">
                            <p>Date Sent</p>
                            <DatePicker date={date} setDate={setDate} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p>Notes</p>
                        <Textarea
                            className="text-base"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    {isEdit ? (
                        <div className="space-y-1">
                            <p>Climbs</p>
                            <p className="italic text-foreground/50">
                                no climbs added
                            </p>
                        </div>
                    ) : null}
                    <div className="mt-4 flex w-full flex-col space-y-2">
                        {isEdit ? (
                            <ClimbDrawer isEdit={false}>
                                <Button
                                    variant="secondary"
                                    className="text-foreground"
                                >
                                    + Add Climb
                                </Button>
                            </ClimbDrawer>
                        ) : null}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setIsSubmitting(true);
                                setIsUploading(true);
                                console.log("submitting form");
                                if (isEdit && sessionId) {
                                    await editSession(
                                        sessionId,
                                        name,
                                        notes,
                                        location,
                                        date,
                                    );
                                } else {
                                    await addSession(
                                        name,
                                        notes,
                                        location,
                                        date,
                                    );
                                }
                                console.log("submitted form");
                                router.refresh();
                                setIsSubmitting(false);
                                setIsUploading(false);
                                setOpen(false);
                            }}
                        >
                            <Button
                                type="submit"
                                className="w-full items-center text-foreground"
                            >
                                {isSubmitting ? (
                                    <LoadingAnimation />
                                ) : isEdit ? (
                                    "Save Changes"
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </form>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerMainContent>
            </DrawerContent>
        </Drawer>
    );
}
