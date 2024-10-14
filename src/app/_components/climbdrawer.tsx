"use client";

import { Plus } from "lucide-react";
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
import { GradeCombobox } from "./gradecombobox";
import { Input } from "~/components/ui/input";
import { addClimb } from "~/app/api/addClimb";
import { useRouter } from "next/navigation";
import { Textarea } from "~/components/ui/textarea";
import { RatingInput } from "./ratinginput";

export function ClimbDrawer() {
    const router = useRouter();
    const [grade, setGrade] = useState("");
    const [name, setName] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full p-2"
                >
                    <Plus className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-dvh">
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle>Enter a climb</DrawerTitle>
                    <DrawerDescription>
                        details for climb go below
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
                    <RatingInput rating={rating} setRating={setRating} />
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
                                    await addClimb(
                                        name,
                                        grade,
                                        attempts,
                                        rating,
                                        notes,
                                    );

                                    router.refresh();
                                }}
                            >
                                <Button type="submit" className="w-full">
                                    Submit
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
