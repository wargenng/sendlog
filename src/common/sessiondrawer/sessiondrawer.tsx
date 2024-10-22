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

import { useState, type ReactNode } from "react";
import { Input } from "~/components/ui/input";
import DrawerMainContent from "../drawermaincontent";
import { LocationsCombobox } from "../locationscombobox";
import { Textarea } from "~/components/ui/textarea";
import { DatePicker } from "../datepicker";
import { ClimbDrawer } from "../climbdrawer/climbdrawer";
import { useRouter } from "next/navigation";
import { LoadingAnimation } from "~/components/loadinganimation";
import { addSession, deleteSession, editSession } from "~/app/api/climbActions";
import type { Climb, Session } from "~/server/db/schema";

interface SessionDrawerProps {
    children: ReactNode;
    climbs?: ReactNode;
    isEdit?: boolean;
    session?: Session;
}

export default function SessionDrawer({
    children,
    climbs,
    isEdit = false,
    session: initialSession,
}: SessionDrawerProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [session, setSession] = useState(
        initialSession ??
            ({
                name: `${String(new Date().getMonth() + 1).padStart(2, "0")}/${String(new Date().getDate()).padStart(2, "0")}/${new Date().getFullYear()}`,
                location: 0,
                notes: "",
                date: new Date(),
            } as Session),
    );
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

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
                        <div className="flex justify-between">
                            <p
                                className={
                                    isRejected && !session.name
                                        ? "text-red-500"
                                        : ""
                                }
                            >
                                Session Name *
                            </p>
                            <div className="flex gap-2">
                                <p className="italic text-red-500/50">
                                    {isRejected &&
                                        !session.name &&
                                        "Session name is required"}
                                </p>
                                <div className={`text-sm text-foreground/50`}>
                                    {session.name.length} / 64
                                </div>
                            </div>
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            value={session.name}
                            onChange={(e) => {
                                if (e.target.value.length <= 64) {
                                    setSession({
                                        ...session,
                                        name: e.target.value,
                                    });
                                }
                            }}
                            className="text-base"
                        />
                    </div>
                    <div className="flex gap-2">
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
                    <div className="space-y-1">
                        <div className="flex justify-between gap-2">
                            <p>Notes</p>
                            <div className={`text-sm text-foreground/50`}>
                                {session.notes.length} / 256
                            </div>
                        </div>
                        <Textarea
                            className="text-base"
                            value={session.notes}
                            onChange={(e) => {
                                if (e.target.value.length <= 256) {
                                    setSession({
                                        ...session,
                                        notes: e.target.value,
                                    });
                                }
                            }}
                        />
                    </div>
                    {isEdit && (
                        <div className="space-y-1">
                            <p>Climbs</p>
                            {climbs}
                        </div>
                    )}
                    <p className="italic text-foreground/50">
                        * Required field
                    </p>
                    <div className="mt-4 flex w-full flex-col space-y-2">
                        {isEdit ? (
                            <ClimbDrawer
                                sessionId={session.id}
                                climb={
                                    {
                                        name: "",
                                        location: session.location,
                                        sendDate: session.date,
                                    } as Climb
                                }
                            >
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
                                if (
                                    !session.name ||
                                    !session.date ||
                                    !session.location
                                ) {
                                    setIsRejected(true);
                                    setIsSubmitting(false);
                                    setIsUploading(false);
                                    console.log(
                                        "Name, date, and location must not be empty",
                                    );
                                    return;
                                }
                                setIsSubmitting(true);
                                setIsUploading(true);
                                console.log("submitting form");
                                if (isEdit && session.id) {
                                    await editSession(session);
                                } else {
                                    await addSession(session);
                                }
                                console.log("submitted form");
                                router.refresh();
                                setIsRejected(false);
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
                        {isEdit && (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setIsDeleting(true);
                                    setIsUploading(true);
                                    console.log("deleting form");
                                    if (session.id !== undefined) {
                                        await deleteSession(session.id);
                                    }
                                    console.log("deleted form");
                                    router.refresh();
                                    setIsRejected(false);
                                    setIsDeleting(false);
                                    setIsUploading(false);
                                    setOpen(false);
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant={"destructive"}
                                    className="w-full items-center text-foreground"
                                >
                                    {isDeleting ? (
                                        <LoadingAnimation />
                                    ) : (
                                        "Delete Session"
                                    )}
                                </Button>
                            </form>
                        )}
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsRejected(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerMainContent>
            </DrawerContent>
        </Drawer>
    );
}
