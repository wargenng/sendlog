import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";

interface YDSEntryProps {
    climb: Climb;
    setClimb: (climb: Climb) => void;
}
const modifiers = ["-", "+", ""];
const ydsmodifiers = ["a", "b", "c", "d"];

const getFullGrade = (
    grade: number,
    modifier: number,
    ydsmodifier: number,
    dash: boolean,
) => {
    return `5.${grade}${getModifier(modifier, ydsmodifier, dash)}`;
};

const getModifier = (modifier: number, ydsmodifier: number, dash: boolean) => {
    return modifier >= 0
        ? `${modifiers[modifier]}`
        : dash
          ? `${ydsmodifiers[ydsmodifier]}/${ydsmodifiers[ydsmodifier + 1]}`
          : `${ydsmodifiers[ydsmodifier]}`;
};

export function YDSEntry({ climb, setClimb }: YDSEntryProps) {
    const grades = 15;
    const [grade, setGrade] = useState(7);
    const [modifier, setModifier] = useState(1);
    const [ydsmodifier, setYDSModifier] = useState(-1);
    const [dash, setDash] = useState(false);
    const clear = 2;

    const handleClimbChange = (
        grade: number,
        modifier: number,
        ydsmodifier: number,
        dash: boolean,
    ) => {
        setGrade(grade);
        setModifier(modifier);
        setYDSModifier(ydsmodifier);
        setDash(dash);
        setClimb({
            ...climb,
            grade: getFullGrade(grade, modifier, ydsmodifier, dash),
        });
    };

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-6 pb-12">
            <div className="flex w-full items-center justify-between">
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    onClick={() => {
                        const newgrade = grade > 0 ? grade - 1 : grades;
                        const checkreset =
                            (newgrade < 10 && ydsmodifier >= 0) ||
                            (newgrade < 7 && modifier !== clear);

                        handleClimbChange(
                            newgrade,
                            checkreset ? clear : modifier,
                            checkreset ? -1 : ydsmodifier,
                            checkreset ? false : dash,
                        );
                    }}
                    variant="none"
                >
                    <ChevronDown className="h-6 w-6" />
                </Button>
                <div className="flex h-max items-start justify-between gap-1 font-bold">
                    <p
                        className={`text-center opacity-0 ${ydsmodifier < 0 ? "text-4xl" : "text-xl"}`}
                    >
                        {getModifier(modifier, ydsmodifier, dash)}
                    </p>
                    <Button
                        variant="none"
                        className="flex h-max p-0 font-bold"
                        onClick={() => {
                            handleClimbChange(
                                grade < grades ? grade + 1 : 0,
                                grade < grades ? modifier : clear,
                                grade < grades ? ydsmodifier : -1,
                                grade < grades ? dash : false,
                            );
                        }}
                    >
                        <h1 className="text-8xl">{"5." + grade}</h1>
                    </Button>
                    <p
                        className={`text-center opacity-50 ${ydsmodifier < 0 ? "text-4xl" : "text-xl"}`}
                    >
                        {getModifier(modifier, ydsmodifier, dash)}
                    </p>
                </div>
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    variant="none"
                    onClick={() => {
                        handleClimbChange(
                            grade < grades ? grade + 1 : 0,
                            grade < grades ? modifier : clear,
                            grade < grades ? ydsmodifier : -1,
                            grade < grades ? dash : false,
                        );
                    }}
                >
                    <ChevronUp className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex h-12 w-full flex-wrap items-center justify-center gap-2">
                {ydsmodifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`h-12 w-12 rounded-full border p-2 text-foreground ${ydsmodifier === i ? "bg-primary text-primary-foreground" : ""} ${grade < 10 ? "pointer-events-none opacity-25" : "pointer-events-auto"}`}
                        onClick={() => {
                            if (grade < 10) return;
                            handleClimbChange(
                                grade,
                                ydsmodifier === i ? clear : -1,
                                ydsmodifier === i ? -1 : i,
                                i === 3 || ydsmodifier === i ? false : dash,
                            );
                        }}
                    >
                        <p className="text-xl">{mod}</p>
                    </Button>
                ))}
                <Button
                    variant="none"
                    className={`h-12 w-12 rounded-full border p-2 text-foreground ${dash ? "bg-primary text-primary-foreground" : ""} ${ydsmodifier < 0 || ydsmodifier > 2 || grade < 10 ? "pointer-events-none opacity-25" : "pointer-events-auto"}`}
                    onClick={() => {
                        handleClimbChange(grade, modifier, ydsmodifier, !dash);
                    }}
                >
                    <p className="text-xl">/</p>
                </Button>
                {modifiers.slice(0, -1).map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`h-12 w-12 rounded-full border p-2 text-foreground ${modifier === i && i !== clear ? "bg-primary text-primary-foreground" : ""} ${grade < 7 && i !== clear ? "pointer-events-none opacity-25" : "pointer-events-auto"}`}
                        onClick={() => {
                            handleClimbChange(
                                grade,
                                modifier === i ? clear : i,
                                -1,
                                false,
                            );
                        }}
                    >
                        <p className="text-2xl">
                            {mod ? mod : <X size={20} />}
                        </p>
                    </Button>
                ))}
                <Button
                    variant="none"
                    className={`p-0`}
                    onClick={() => {
                        handleClimbChange(grade, clear, -1, false);
                    }}
                >
                    <X size={20} />
                </Button>
            </div>
        </div>
    );
}
