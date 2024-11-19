import { Ban, ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { Climb } from "~/server/db/schema";
import { GradeScrollable } from "../gradescrollable";
import { HuecoEntry } from "./components/huecoentry";

interface GradePickerSheetProps {
    children: ReactNode;
    climbs: Climb[];
    setClimbs: (climbs: Climb[]) => void;
}

const modifiers = ["-", "", "+", "/"];
const ydsmodifiers = ["a", "-", "a/b", "b", "", "b/c", "c", "+", "c/d", "d"];
const grades = 17;

export function GradePickerSheet({
    children,
    climbs,
    setClimbs,
}: GradePickerSheetProps) {
    const [open, setOpen] = useState(false);
    const [climb, setClimb] = useState({} as Climb);

    const handleOpen = (open: boolean) => {
        setClimb({} as Climb);
        setOpen(open);
    };

    return (
        <Sheet open={open} onOpenChange={handleOpen}>
            <SheetTrigger className="" asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col">
                <SheetHeader>
                    <SheetTitle>Enter Climbs</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="flex h-full flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <h1>Climbs: {climbs.length}</h1>
                        </div>
                        <GradeScrollable
                            climbs={climbs}
                            setClimbs={setClimbs}
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="none"
                                className="rounded-none border-b border-primary"
                            >
                                Hueco
                            </Button>
                            <Button variant="none" className="">
                                YDS
                            </Button>
                        </div>
                    </div>
                    <HuecoEntry hueco={climb} setHueco={setClimb} />
                    <div className="flex w-full justify-between"></div>
                </div>
                <SheetFooter className="flex w-full flex-col items-end justify-center gap-2 pb-6">
                    <Button
                        className="w-full bg-accent-2 text-foreground"
                        variant="none"
                        onClick={() => {
                            setClimbs([
                                {
                                    name: "",
                                    grade: climb.grade,
                                    attempts: 1,
                                    rating: 0,
                                    type: "Boulder",
                                    notes: "",
                                } as Climb,
                                ...climbs,
                            ]);
                        }}
                    >
                        Add Climb
                    </Button>
                    <SheetClose className="w-full" asChild>
                        <Button className="w-full bg-primary text-primary-foreground">
                            Done
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
