import { Ban, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";

interface YDSEntryProps {
    climb: Climb;
    setClimb: (climb: Climb) => void;
}

export function YDSEntry({ climb, setClimb }: YDSEntryProps) {
    const modifiers = ["-", "", "+"];
    const ydsmodifiers = ["a", "b", "c", "d"];
    const grades = 15;
    const [grade, setGrade] = useState(7);
    const [modifier, setModifier] = useState(1);
    const [ydsmodifier, setYDSModifier] = useState(-1);
    const [dash, setDash] = useState(false);
    const fullGrade =
        "5." +
        (modifier >= 0
            ? modifiers[modifier] === ""
                ? grade
                : `${grade}${modifiers[modifier]}`
            : ydsmodifier >= 0
              ? dash
                  ? `${grade}${ydsmodifiers[ydsmodifier]}/${ydsmodifiers[ydsmodifier + 1]}`
                  : `${grade}${ydsmodifiers[ydsmodifier]}`
              : grade);

    useEffect(() => {
        setClimb({ ...climb, grade: fullGrade });
    }, [fullGrade]);

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center gap-4">
                {modifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`flex space-x-1 rounded-none p-2 text-foreground ${modifier === i ? "border-b border-primary" : ""} ${grade < 7 && i !== 1 ? "opacity-25" : ""}`}
                        onClick={() => {
                            if (grade < 7) return;
                            setDash(false);
                            setYDSModifier(-1);
                            if (modifier === i) {
                                setModifier(1);
                            } else {
                                setModifier(i);
                            }
                        }}
                    >
                        <p className="text-2xl">
                            {mod ? mod : <Ban size={20} />}
                        </p>
                    </Button>
                ))}
            </div>
            <div className="flex w-full items-center justify-center">
                <Button
                    variant="none"
                    className="h-max text-8xl font-bold"
                    onClick={() => {
                        if (grade < grades) {
                            setGrade(grade + 1);
                        } else {
                            setGrade(0);
                            setDash(false);
                            setModifier(1);
                            setYDSModifier(-1);
                        }
                    }}
                >
                    {fullGrade}
                </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
                {ydsmodifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`flex space-x-1 rounded-none p-2 text-foreground ${ydsmodifier === i ? "border-b border-primary" : ""} ${grade < 10 ? "opacity-25" : ""}`}
                        onClick={() => {
                            if (grade < 10) return;
                            if (i === 3) setDash(false);
                            if (ydsmodifier === i) {
                                setYDSModifier(-1);
                                setModifier(1);
                                setDash(false);
                            } else {
                                setYDSModifier(i);
                                setModifier(-1);
                            }
                        }}
                    >
                        <p className="text-xl">{mod}</p>
                    </Button>
                ))}
                <Button
                    key={"/" + 4}
                    variant="none"
                    className={`flex space-x-1 rounded-none p-2 text-foreground ${dash ? "border-b border-primary" : ""} ${ydsmodifier < 0 || ydsmodifier > 2 || grade < 10 ? "opacity-25" : ""}`}
                    onClick={() => {
                        if (grade < 10) return;
                        if (ydsmodifier < 0 || ydsmodifier > 2) return;
                        setDash(!dash);
                    }}
                >
                    <p className="text-xl">/</p>
                </Button>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    variant="none"
                    onClick={() => {
                        if (grade < grades) {
                            setGrade(grade + 1);
                        } else {
                            setGrade(0);
                            setDash(false);
                            setModifier(1);
                            setYDSModifier(-1);
                        }
                    }}
                >
                    <ChevronUp className="h-6 w-6" />
                </Button>
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    onClick={() => {
                        if (grade > 0) {
                            setGrade(grade - 1);
                            if (grade - 1 < 10 && ydsmodifier >= 0) {
                                setModifier(1);
                                setYDSModifier(-1);
                                setDash(false);
                            } else if (grade - 1 < 7 && modifier !== 1) {
                                setModifier(1);
                                setDash(false);
                                setYDSModifier(-1);
                            }
                        } else {
                            setGrade(grades);
                        }
                    }}
                    variant="none"
                >
                    <ChevronDown className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
