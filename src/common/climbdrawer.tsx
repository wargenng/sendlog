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
import { deleteClimb } from "~/app/api/climbActions";
import { ClimbDatePicker } from "~/app/_components/climbdatepicker";
import { Label } from "recharts";

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
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [isUploading, setIsUploading] = useState(false);
    const [isModifying, setIsModifying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
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
                <div
                    className={`flex flex-col gap-2 overflow-y-auto p-4 text-sm ${
                        isUploading ? "pointer-events-none brightness-50" : ""
                    }`}
                >
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
                        <div className="w-full space-y-1">
                            <p>Date Sent</p>
                            <ClimbDatePicker date={date} setDate={setDate} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p>Location</p>
                        <LocationsCombobox
                            location={location}
                            setLocation={setLocation}
                        />
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
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setIsModifying(true);
                                setIsUploading(true);
                                console.log("submitting form");
                                if (isEdit) {
                                    await editClimb(
                                        climbId,
                                        name,
                                        grade,
                                        attempts,
                                        rating,
                                        notes,
                                        location,
                                        date,
                                    );
                                } else {
                                    await addClimb(
                                        name,
                                        grade,
                                        attempts,
                                        rating,
                                        notes,
                                        location,
                                        date,
                                    );
                                }
                                console.log("submitted form");
                                router.refresh();
                                setIsModifying(false);
                                setIsUploading(false);
                                setOpen(false);
                            }}
                        >
                            <Button
                                type="submit"
                                className="w-full items-center text-foreground"
                            >
                                {isModifying ? (
                                    <Loading />
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
                                    await deleteClimb(climbId);
                                    console.log("deleting form");
                                    router.refresh();
                                    setIsDeleting(false);
                                    setIsUploading(false);
                                    setOpen(false);
                                }}
                            >
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                >
                                    {isDeleting ? <Loading /> : "Delete Climb"}
                                </Button>
                            </form>
                        )}
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

const Loading = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
    >
        <circle cx="18" cy="12" r="0" fill="currentColor">
            <animate
                attributeName="r"
                begin=".67"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
            />
        </circle>
        <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate
                attributeName="r"
                begin=".33"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
            />
        </circle>
        <circle cx="6" cy="12" r="0" fill="currentColor">
            <animate
                attributeName="r"
                begin="0"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
            />
        </circle>
    </svg>
);
