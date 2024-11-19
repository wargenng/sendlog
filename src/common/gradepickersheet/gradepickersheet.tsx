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
    const [grade, setGrade] = useState(0);
    const [modifier, setModifier] = useState(1);
    const fullGrade =
        "V" +
        (modifiers[modifier] === ""
            ? grade
            : modifiers[modifier] === "/"
              ? `${grade}/${grade + 1}`
              : `${grade}${modifiers[modifier]}`);

    const handleOpen = (open: boolean) => {
        setGrade(0);
        setModifier(1);
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
                    <div className="flex w-full flex-col items-center justify-center">
                        <div className="flex w-full flex-col items-center justify-center space-y-6">
                            <Button
                                className="w-full border"
                                variant="none"
                                onClick={() => {
                                    setGrade(grade < grades ? grade + 1 : 0);
                                }}
                            >
                                <ChevronUp className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="none"
                                className="h-max text-8xl font-bold"
                                onClick={() => {
                                    setGrade(grade < grades ? grade + 1 : 0);
                                }}
                            >
                                {fullGrade}
                            </Button>
                            <div className="flex items-center gap-4">
                                {modifiers.map((mod, i) => (
                                    <Button
                                        key={mod + i}
                                        variant="none"
                                        className={`flex space-x-1 rounded-none p-2 text-foreground ${modifier === i ? "border-b border-primary" : ""}`}
                                        onClick={() => {
                                            setModifier(i);
                                        }}
                                    >
                                        <p className="text-2xl">
                                            {mod ? mod : <Ban size={20} />}
                                        </p>
                                    </Button>
                                ))}
                            </div>
                            <Button
                                className="w-full border"
                                onClick={() => {
                                    setGrade(grade > 0 ? grade - 1 : grades);
                                }}
                                variant="none"
                            >
                                <ChevronDown className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
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
                                    grade: fullGrade,
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
