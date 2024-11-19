import { ArrowDown, ArrowUp, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
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
import { GradeScrollable } from "../gradescrollable";

interface GradePickerSheetProps {
    children: ReactNode;
    climbs: string[];
    setClimbs: (climbs: string[]) => void;
}

const modifiers = ["", "/", "+", "-"];
const grades = 17;

export function GradePickerSheet({
    children,
    climbs,
    setClimbs,
}: GradePickerSheetProps) {
    const [open, setOpen] = useState(false);
    const [grade, setGrade] = useState(0);
    const [modifier, setModifier] = useState(0);
    const fullGrade =
        "V" +
        (modifiers[modifier] === ""
            ? grade
            : modifiers[modifier] === "/"
              ? `${grade}/${grade + 1}`
              : `${grade}${modifiers[modifier]}`);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                        <h1>added grades</h1>
                        <GradeScrollable
                            climbs={climbs}
                            setClimbs={setClimbs}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Label>Current Grade</Label>
                            <h1 className="text-8xl font-bold">{fullGrade}</h1>
                            <div className="flex gap-2">
                                <Button variant="outline" className="">
                                    V-scale
                                </Button>
                                <Button variant="outline" className="">
                                    YDS
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex w-1/5 flex-col items-center justify-center space-y-1">
                            <Label>Grade</Label>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setGrade(grade < grades ? grade + 1 : 0);
                                }}
                            >
                                <ArrowUp className="h-6 w-6" />
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setGrade(grade > 0 ? grade - 1 : grades);
                                }}
                            >
                                <ArrowDown className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="flex w-1/5 flex-col items-center justify-center space-y-1">
                            <Button
                                className="h-20 w-20 rounded-full bg-accent-2 text-foreground"
                                variant="none"
                                onClick={() => {
                                    setClimbs([fullGrade, ...climbs]);
                                }}
                            >
                                <ArrowUp className="h-12 w-12" />
                            </Button>
                        </div>
                        <div className="flex w-1/5 flex-col items-center justify-center space-y-1">
                            <Label>Modifier</Label>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setModifier(
                                        modifier < modifiers.length - 1
                                            ? modifier + 1
                                            : 0,
                                    );
                                }}
                            >
                                <ArrowUp className="h-6 w-6" />
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setModifier(
                                        modifier > 0
                                            ? modifier - 1
                                            : modifiers.length - 1,
                                    );
                                }}
                            >
                                <ArrowDown className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
                <SheetFooter className="flex w-full flex-row items-end justify-center gap-6 pb-6">
                    <SheetClose className="w-full" asChild>
                        <Button className="w-full bg-accent-3 text-accent-foreground">
                            Done
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
