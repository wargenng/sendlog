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
import { GradeScrollable } from "../gradesscrollable/gradescrollable";
import { HuecoEntry } from "./components/huecoentry";
import { YDSEntry } from "./components/ydsentry";

interface GradePickerSheetProps {
    children: ReactNode;
    climbs: Climb[];
    setClimbs: (climbs: Climb[]) => void;
}

const gradeTypes = ["Hueco", "YDS"];

export function GradePickerSheet({
    children,
    climbs,
    setClimbs,
}: GradePickerSheetProps) {
    const [open, setOpen] = useState(false);
    const [climb, setClimb] = useState({} as Climb);
    const [gradeType, setGradeType] = useState("Hueco");

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
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h1>Climbs: {climbs.length}</h1>
                    </div>
                    <GradeScrollable climbs={climbs} setClimbs={setClimbs} />
                    <div className="flex w-full justify-center gap-2">
                        {gradeTypes.map((type) => (
                            <Button
                                key={type}
                                variant="none"
                                className={`w-full text-center ${
                                    gradeType === type
                                        ? "rounded-none border-b border-foreground"
                                        : ""
                                }`}
                                onClick={() => {
                                    setGradeType(type);
                                }}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex h-full flex-col items-center justify-center">
                    {gradeType === "Hueco" ? (
                        <HuecoEntry hueco={climb} setHueco={setClimb} />
                    ) : (
                        <YDSEntry climb={climb} setClimb={setClimb} />
                    )}
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
                                    type:
                                        gradeType === "Hueco"
                                            ? "Boulder"
                                            : "Sport",
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
