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
import type { Climb } from "~/server/db/schema";

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
    climb?: Climb;
    sessionId?: number;
}
export function ClimbDrawer({
    children,
    isEdit,
    climb: initialClimb,
    sessionId,
}: ClimbDrawerProps) {
    const [open, setOpen] = useState(false);
    const [climb, setClimb] = useState(
        initialClimb ??
            ({
                id: -1,
                name: "",
                location: 0,
                notes: "",
                grade: "",
                attempts: 0,
                rating: 0,
                sendDate: new Date(),
            } as Climb),
    );
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
                                    isRejected && !climb.name
                                        ? "text-red-500"
                                        : ""
                                }
                            >
                                Name *
                            </p>
                            <div className="italic text-red-500/50">
                                {isRejected &&
                                    !climb.name &&
                                    "Name is required"}
                            </div>
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            value={climb.name}
                            onChange={(e) =>
                                setClimb({ ...climb, name: e.target.value })
                            }
                            className="text-base"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1/2 space-y-1">
                            <div className="flex justify-between">
                                <p
                                    className={
                                        isRejected && !climb.grade
                                            ? "text-red-500"
                                            : ""
                                    }
                                >
                                    Grade *
                                </p>
                                <div className="italic text-red-500/50">
                                    {isRejected &&
                                        !climb.grade &&
                                        "Grade is required"}
                                </div>
                            </div>
                            <GradeCombobox
                                grade={climb.grade}
                                setGrade={(grade) => {
                                    setClimb({ ...climb, grade });
                                }}
                            />
                        </div>
                        <div className="w-1/2 space-y-1">
                            <p>Attempts</p>
                            <Input
                                type="number"
                                placeholder="Enter attempts"
                                value={climb.attempts ? climb.attempts : "-"}
                                onChange={(e) =>
                                    setClimb({
                                        ...climb,
                                        attempts: parseInt(e.target.value),
                                    })
                                }
                                className="text-base"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <RatingInput
                            rating={climb.rating ?? 0}
                            setRating={(rating) => {
                                setClimb({ ...climb, rating: rating });
                            }}
                        />
                        <div className="w-full space-y-1">
                            <div className="flex justify-between">
                                <p
                                    className={
                                        isRejected && !climb.sendDate
                                            ? "text-red-500"
                                            : ""
                                    }
                                >
                                    Date Sent *
                                </p>
                                <div className="italic text-red-500/50">
                                    {isRejected &&
                                        !climb.sendDate &&
                                        "Date is required"}
                                </div>
                            </div>
                            <DatePicker
                                date={climb.sendDate}
                                setDate={(date: Date) => {
                                    setClimb({ ...climb, sendDate: date });
                                }}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p
                                className={
                                    isRejected && !climb.location
                                        ? "text-red-500"
                                        : ""
                                }
                            >
                                Location *
                            </p>
                            <div className="italic text-red-500/50">
                                {isRejected &&
                                    !climb.location &&
                                    "Location is required"}
                            </div>
                        </div>
                        <LocationsCombobox
                            location={climb.location}
                            setLocation={(location) => {
                                setClimb({ ...climb, location: location });
                            }}
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p>Notes</p>
                            <div className={`text-sm text-foreground/50`}>
                                {climb.notes?.length ?? 0} / 256
                            </div>
                        </div>
                        <Textarea
                            className="text-base"
                            value={climb.notes ?? ""}
                            onChange={(e) => {
                                if (e.target.value.length <= 256) {
                                    setClimb({
                                        ...climb,
                                        notes: e.target.value,
                                    });
                                }
                            }}
                        />
                    </div>
                    <p className="italic">* Required field</p>
                    <div className="mt-4 space-y-2">
                        <SubmitButton
                            setIsUploading={setIsUploading}
                            isEdit={isEdit}
                            climb={climb}
                            setIsRejected={setIsRejected}
                            sessionId={sessionId}
                            setOpen={setOpen}
                        />
                        {isEdit && (
                            <DeleteClimbForm
                                setIsUploading={setIsUploading}
                                climbId={climb.id}
                                setOpen={setOpen}
                                setIsRejected={setIsRejected}
                            />
                        )}
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="w-full"
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
