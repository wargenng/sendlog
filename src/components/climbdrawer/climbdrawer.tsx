"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DrawerTop } from "~/components/drawer/drawertop";
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
import type { Climb } from "~/server/db/schema";
import DrawerMainContent from "../drawer/drawermaincontent";
import { DeleteClimbForm } from "./components/deletebutton";
import { GradeCombobox } from "./components/gradecombobox";
import { RatingInput } from "./components/ratinginput";
import { SubmitButton } from "./components/submitbutton";

interface ClimbDrawerProps {
    children: React.ReactNode;
    climb?: Climb;
    sessionId?: number;
}
export function ClimbDrawer({
    children,
    climb: initialClimb,
    sessionId,
}: ClimbDrawerProps) {
    const [open, setOpen] = useState(false);
    const [climb, setClimb] = useState(
        initialClimb ??
            ({
                id: 0,
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
                <DrawerTop />
                <DrawerHeader className="flex flex-col items-start justify-start -space-y-2">
                    <DrawerTitle className="text-2xl">
                        {climb.id ? "Edit climb" : "Enter a climb"}
                    </DrawerTitle>
                    <DrawerDescription>
                        {climb.id
                            ? "Edit details for climb"
                            : "Details for climb go below"}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent isUploading={isUploading}>
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p>Name</p>
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
                            climb={climb}
                            setIsRejected={setIsRejected}
                            sessionId={sessionId}
                            setOpen={setOpen}
                        />
                        {climb.id ? (
                            <DeleteClimbForm
                                setIsUploading={setIsUploading}
                                climbId={climb.id}
                                setOpen={setOpen}
                                setIsRejected={setIsRejected}
                            />
                        ) : null}
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
