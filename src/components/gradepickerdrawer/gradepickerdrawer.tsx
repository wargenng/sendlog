import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { Climb } from "~/server/db/schema";
import { GradeScrollable } from "../gradesscrollable/gradescrollable";
import { HuecoEntry } from "./components/huecoentry";
import { YDSEntry } from "./components/ydsentry";
import { DrawerRight } from "../drawer/drawerright";

interface GradePickerDrawerProps {
    children: ReactNode;
    climbs: Climb[];
    setClimbs: (climbs: Climb[]) => void;
}

const gradeTypes = ["Hueco", "YDS"];

export function GradePickerDrawer({
    children,
    climbs,
    setClimbs,
}: GradePickerDrawerProps) {
    const [open, setOpen] = useState(false);
    const [climb, setClimb] = useState({} as Climb);
    const [gradeType, setGradeType] = useState("Hueco");

    const handleOpen = (open: boolean) => {
        setClimb({} as Climb);
        setOpen(open);
    };

    return (
        <Drawer open={open} onOpenChange={handleOpen} direction="right">
            <DrawerTrigger className="" asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="flex h-full flex-col px-4">
                <DrawerRight />
                <DrawerHeader className="mt-2">
                    <DrawerTitle>Enter Climbs</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="space-y-2 p-4">
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
                <DrawerFooter className="flex w-full flex-col items-end justify-center gap-2 pb-6">
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
                    <DrawerClose className="w-full" asChild>
                        <Button className="w-full bg-primary text-primary-foreground">
                            Done
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
