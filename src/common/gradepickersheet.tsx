import {
    ArrowBigDown,
    ArrowBigUp,
    ArrowUp,
    ArrowUpWideNarrowIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
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

interface GradePickerSheetProps {
    children: ReactNode;
    bulk: string[];
    setBulk: (bulk: string[]) => void;
}

const modifiers = ["", "/", "+", "-"];
const grades = 17;

export function GradePickerSheet({
    children,
    bulk,
    setBulk,
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
            <SheetTrigger className="w-full" asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col">
                <SheetHeader>
                    <SheetTitle>Enter Climbs</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="flex h-full flex-col justify-between">
                    <div>
                        <h1>added grades</h1>
                        <div className="h-8">{bulk.join(", ")}</div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <Label>Current Grade</Label>
                            <h1 className="text-8xl font-bold">{fullGrade}</h1>
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
                                <ArrowBigUp className="h-6 w-6" />
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    setGrade(grade > 0 ? grade - 1 : grades);
                                }}
                            >
                                <ArrowBigDown className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="flex w-1/5 flex-col items-center justify-center space-y-1">
                            <Button
                                className="h-20 w-20 rounded-full bg-accent-2 text-foreground"
                                variant="none"
                                onClick={() => {
                                    setBulk([...bulk, fullGrade]);
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
                                <ArrowBigUp className="h-6 w-6" />
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
                                <ArrowBigDown className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
                <SheetFooter className="flex w-full flex-row items-end justify-center gap-6 pb-6">
                    <SheetClose className="w-full">
                        <Button className="bg-accent-3 w-full text-accent-foreground">
                            Done
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
