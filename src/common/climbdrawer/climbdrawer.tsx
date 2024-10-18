"use client";

import * as React from "react";
import { useState } from "react";
import { DatePicker } from "~/common/datepicker";
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
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { DeleteClimbForm } from "./components/deletebutton";
import { GradeCombobox } from "./components/gradecombobox";
import { LocationsCombobox } from "../locationscombobox";
import { RatingInput } from "./components/ratinginput";
import { SubmitButton } from "./components/submitbutton";
import DrawerMainContent from "../drawermaincontent";

interface ClimbDrawerProps {
    children: React.ReactNode;
    isEdit: boolean;
    id?: number;
    grade?: string;
    name?: string;
    attempts?: number;
    rating?: number;
    location?: number;
    notes?: string;
    date?: Date;
    sessionId?: number;
}
export function ClimbDrawer({
    children,
    isEdit,
    id: climbId = -1,
    grade: initialGrade = "",
    name: initialName = "",
    attempts: initialAttempts = 0,
    rating: initialRating = 0,
    location: initialLocation = 0,
    notes: initialNotes = "",
    date: initialDate = new Date(),
    sessionId,
}: ClimbDrawerProps) {
    const [grade, setGrade] = useState(initialGrade || "");
    const [name, setName] = useState(initialName || "");
    const [attempts, setAttempts] = useState(initialAttempts || 0);
    const [rating, setRating] = useState(initialRating || 0);
    const [location, setLocation] = useState(initialLocation || 0);
    const [notes, setNotes] = useState(initialNotes || "");
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>(initialDate || new Date());
    const [isUploading, setIsUploading] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-[calc(100dvh-1rem)]">
                <DrawerHeader className="flex flex-col items-start justify-start -space-y-2">
                    <DrawerTitle className="text-2xl">
                        {isEdit ? "Edit climb" : "Enter a climb"}
                    </DrawerTitle>
                    <DrawerDescription>
                        {isEdit
                            ? "Edit details for climb"
                            : "Details for climb go below"}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent isUploading={isUploading}>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p
                                className={
                                    isRejected && !name ? "text-red-500" : ""
                                }
                            >
                                Name *
                            </p>
                            <div className="italic text-red-500/50">
                                {isRejected && !name && "Name is required"}
                            </div>
                        </div>
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
                            <div className="flex justify-between">
                                <p
                                    className={
                                        isRejected && !grade
                                            ? "text-red-500"
                                            : ""
                                    }
                                >
                                    Grade *
                                </p>
                                <div className="italic text-red-500/50">
                                    {isRejected &&
                                        !grade &&
                                        "Grade is required"}
                                </div>
                            </div>
                            <GradeCombobox grade={grade} setGrade={setGrade} />
                        </div>
                        <div className="w-1/2 space-y-1">
                            <p>Attempts</p>
                            <Input
                                type="number"
                                placeholder="Enter attempts"
                                value={attempts ? attempts : "-"}
                                onChange={(e) =>
                                    setAttempts(Number(e.target.value))
                                }
                                className="text-base"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <RatingInput rating={rating} setRating={setRating} />
                        <div className="w-full space-y-1">
                            <div className="flex justify-between">
                                <p
                                    className={
                                        isRejected && !date
                                            ? "text-red-500"
                                            : ""
                                    }
                                >
                                    Date Sent *
                                </p>
                                <div className="italic text-red-500/50">
                                    {isRejected && !date && "Date is required"}
                                </div>
                            </div>
                            <DatePicker date={date} setDate={setDate} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p
                                className={
                                    isRejected && !location
                                        ? "text-red-500"
                                        : ""
                                }
                            >
                                Location *
                            </p>
                            <div className="italic text-red-500/50">
                                {isRejected &&
                                    !location &&
                                    "Location is required"}
                            </div>
                        </div>
                        <LocationsCombobox
                            location={location}
                            setLocation={setLocation}
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p>Notes</p>
                            <div className={`text-sm text-foreground/50`}>
                                {notes.length} / 256
                            </div>
                        </div>
                        <Textarea
                            className="text-base"
                            value={notes}
                            onChange={(e) => {
                                if (e.target.value.length <= 256) {
                                    setNotes(e.target.value);
                                }
                            }}
                        />
                    </div>
                    <p className="italic">* Required field</p>
                    <div className="mt-4 space-y-2">
                        <SubmitButton
                            setIsUploading={setIsUploading}
                            isEdit={isEdit}
                            climbId={climbId}
                            name={name}
                            grade={grade}
                            attempts={attempts}
                            rating={rating}
                            notes={notes}
                            location={location}
                            date={date}
                            setIsRejected={setIsRejected}
                            sessionId={sessionId}
                            setOpen={setOpen}
                        />
                        {isEdit && (
                            <DeleteClimbForm
                                setIsUploading={setIsUploading}
                                climbId={climbId}
                                setOpen={setOpen}
                            />
                        )}
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerMainContent>
            </DrawerContent>
        </Drawer>
    );
}
