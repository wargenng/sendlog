"use client";

import { useState } from "react";
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
import * as React from "react";
import { GradeCombobox } from "../app/_components/gradecombobox";
import { Input } from "~/components/ui/input";
import { addClimb, editClimb } from "~/app/api/climbActions";
import { useRouter } from "next/navigation";
import { Textarea } from "~/components/ui/textarea";
import { RatingInput } from "../app/_components/ratinginput";
import { LocationsCombobox } from "../app/_components/locationscombobox";

interface ClimbDrawerProps {
    children: React.ReactNode;
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
}: ClimbDrawerProps & {
    isEdit: boolean;
    id?: number;
    grade?: string;
    name?: string;
    attempts?: number;
    rating?: number;
    location?: number;
    notes?: string;
}) {
    const router = useRouter();
    const [grade, setGrade] = useState(initialGrade || "");
    const [name, setName] = useState(initialName || "");
    const [attempts, setAttempts] = useState(initialAttempts || 0);
    const [rating, setRating] = useState(initialRating || 0);
    const [location, setLocation] = useState(initialLocation || 0);
    const [notes, setNotes] = useState(initialNotes || "");

    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="h-dvh">
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle>
                        {isEdit ? "Edit climb" : "Enter a climb"}
                    </DrawerTitle>
                    <DrawerDescription>
                        {isEdit
                            ? "Edit details for climb"
                            : "Details for climb go below"}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-2 overflow-y-auto p-4 text-sm">
                    <div className="space-y-1">
                        <p>Name</p>
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
                            <p>Grade</p>
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
                        <div className="w-3/5 space-y-1">
                            <p>Location</p>
                            <LocationsCombobox
                                location={location}
                                setLocation={setLocation}
                            />
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
                    <div className="mt-4 space-y-2">
                        <DrawerClose asChild>
                            <form
                                action={async () => {
                                    if (isEdit) {
                                        await editClimb(
                                            climbId,
                                            name,
                                            grade,
                                            attempts,
                                            rating,
                                            notes,
                                            location,
                                        );
                                    } else {
                                        await addClimb(
                                            name,
                                            grade,
                                            attempts,
                                            rating,
                                            notes,
                                            location,
                                        );
                                    }

                                    router.refresh();
                                }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full text-foreground"
                                >
                                    {isEdit ? "Save Changes" : "Submit"}
                                </Button>
                            </form>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
