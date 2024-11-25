import { Ban, ChevronDown, ChevronUp } from "lucide-react";
import { check } from "prettier";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";

interface YDSEntryProps {
    climb: Climb;
    setClimb: (climb: Climb) => void;
}
const modifiers = ["-", "", "+"];
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

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-6 pb-12">
            <div className="flex w-full items-center justify-between">
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    onClick={() => {
                        const newgrade = grade > 0 ? grade - 1 : grades;
                        const checkreset =
                            (newgrade < 10 && ydsmodifier >= 0) ||
                            (newgrade < 7 && modifier !== 1);

                        setGrade(newgrade);
                        setModifier(checkreset ? 1 : modifier);
                        setYDSModifier(checkreset ? -1 : ydsmodifier);
                        setDash(checkreset ? false : dash);

                        setClimb({
                            ...climb,
                            grade: getFullGrade(
                                newgrade,
                                checkreset ? 1 : modifier,
                                checkreset ? -1 : ydsmodifier,
                                checkreset ? false : dash,
                            ),
                        });
                    }}
                    variant="none"
                >
                    <ChevronDown className="h-6 w-6" />
                </Button>
                <Button
                    variant="none"
                    className="h-max p-0 text-8xl font-bold"
                    onClick={() => {
                        setGrade(grade < grades ? grade + 1 : 0);
                        setModifier(grade < grades ? modifier : 1);
                        setYDSModifier(grade < grades ? ydsmodifier : -1);
                        setDash(grade < grades ? dash : false);

                        setClimb({
                            ...climb,
                            grade: getFullGrade(
                                grade < grades ? grade + 1 : 0,
                                grade < grades ? modifier : 1,
                                grade < grades ? ydsmodifier : -1,
                                grade < grades ? dash : false,
                            ),
                        });
                    }}
                >
                    {getFullGrade(grade, modifier, ydsmodifier, dash)}
                </Button>
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    variant="none"
                    onClick={() => {
                        setGrade(grade < grades ? grade + 1 : 0);
                        setModifier(grade < grades ? modifier : 1);
                        setYDSModifier(grade < grades ? ydsmodifier : -1);
                        setDash(grade < grades ? dash : false);

                        setClimb({
                            ...climb,
                            grade: getFullGrade(
                                grade < grades ? grade + 1 : 0,
                                grade < grades ? modifier : 1,
                                grade < grades ? ydsmodifier : -1,
                                grade < grades ? dash : false,
                            ),
                        });
                    }}
                >
                    <ChevronUp className="h-6 w-6" />
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
                            setModifier(ydsmodifier === i ? 1 : -1);
                            setYDSModifier(ydsmodifier === i ? -1 : i);
                            setDash(
                                i === 3 || ydsmodifier === i ? false : dash,
                            );

                            setClimb({
                                ...climb,
                                grade: getFullGrade(
                                    grade,
                                    ydsmodifier === i ? 1 : -1,
                                    ydsmodifier === i ? -1 : i,
                                    i === 3 || ydsmodifier === i ? false : dash,
                                ),
                            });
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
                        if (grade < 10 || ydsmodifier < 0 || ydsmodifier > 2)
                            return;
                        setDash(!dash);
                        setClimb({
                            ...climb,
                            grade: getFullGrade(
                                grade,
                                modifier,
                                ydsmodifier,
                                !dash,
                            ),
                        });
                    }}
                >
                    <p className="text-xl">/</p>
                </Button>
                {modifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`flex space-x-1 rounded-none p-2 text-foreground ${modifier === i ? "border-b border-primary" : ""} ${grade < 7 && i !== 1 ? "opacity-25" : ""}`}
                        onClick={() => {
                            if (grade < 7) return;
                            setModifier(modifier === i ? 1 : i);
                            setYDSModifier(-1);
                            setDash(false);

                            setClimb({
                                ...climb,
                                grade: getFullGrade(
                                    grade,
                                    modifier === i ? 1 : i,
                                    -1,
                                    false,
                                ),
                            });
                        }}
                    >
                        <p className="text-2xl">
                            {mod ? mod : <Ban size={20} />}
                        </p>
                    </Button>
                ))}
            </div>
            <div className="flex w-full items-center justify-center gap-4"></div>
        </div>
    );
}
