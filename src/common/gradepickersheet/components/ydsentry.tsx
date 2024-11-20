import { set } from "date-fns";
import { Ban, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Climb } from "~/server/db/schema";

interface YDSEntryProps {
    climb: Climb;
    setClimb: (climb: Climb) => void;
}

export function YDSEntry({ climb, setClimb }: YDSEntryProps) {
    const modifiers = ["-", "", "+"];
    const ydsmodifiers = ["a", "b", "c", "d"];
    const grades = 15;
    const [grade, setGrade] = useState(5);
    const [modifier, setModifier] = useState(1);
    const [ydsmodifier, setYDSModifier] = useState(-1);
    const [dash, setDash] = useState(false);
    const fullGrade =
        "5." +
        (modifier >= 0
            ? modifiers[modifier] === ""
                ? grade
                : `${grade}${modifiers[modifier]}`
            : dash
              ? `${grade}${ydsmodifiers[ydsmodifier]}/${ydsmodifiers[ydsmodifier + 1]}`
              : `${grade}${ydsmodifiers[ydsmodifier]}`);

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
                        className={`flex space-x-1 rounded-none p-2 text-foreground ${modifier === i ? "border-b border-primary" : ""}`}
                        onClick={() => {
                            setModifier(i);
                            setDash(false);
                            setYDSModifier(-1);
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
                        setGrade(grade < grades ? grade + 1 : 0);
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
                        className={`flex space-x-1 rounded-none p-2 text-foreground ${ydsmodifier === i ? "border-b border-primary" : ""}`}
                        onClick={() => {
                            if (i === 3) setDash(false);
                            setYDSModifier(i);
                            setModifier(-1);
                        }}
                    >
                        <p className="text-xl">{mod}</p>
                    </Button>
                ))}
                <Button
                    key={"/" + 4}
                    variant="none"
                    className={`flex space-x-1 rounded-none p-2 text-foreground ${dash ? "border-b border-primary" : ""} ${ydsmodifier < 0 || ydsmodifier > 2 ? "opacity-25" : ""}`}
                    onClick={() => {
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
                        setGrade(grade < grades ? grade + 1 : 0);
                    }}
                >
                    <ChevronUp className="h-6 w-6" />
                </Button>
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    onClick={() => {
                        setGrade(grade > 0 ? grade - 1 : grades);
                    }}
                    variant="none"
                >
                    <ChevronDown className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
