import { get } from "http";
import { Ban, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";

interface HuecoEntryProps {
    hueco: Climb;
    setHueco: (hueco: Climb) => void;
}
const modifiers = ["-", "+", "/", ""];
const getFullGrade = (grade: number, modifier: number) => {
    return `V${grade}${getModifier(grade, modifier)}`;
};
const getModifier = (grade: number, modifier: number) => {
    return modifiers[modifier] === "/"
        ? `/${grade + 1}`
        : `${modifiers[modifier]}`;
};

export function HuecoEntry({ hueco, setHueco }: HuecoEntryProps) {
    const grades = 17;
    const [grade, setGrade] = useState(0);
    const [modifier, setModifier] = useState(3);
    const handleGradeChange = (grade: number) => {
        setGrade(grade);
        setHueco({
            ...hueco,
            grade: getFullGrade(grade, modifier),
        });
    };

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-6 pb-12">
            <div className="flex w-full items-center justify-between">
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    onClick={() => {
                        handleGradeChange(grade > 0 ? grade - 1 : grades);
                    }}
                    variant="none"
                >
                    <ChevronDown className="h-6 w-6" />
                </Button>
                <div className="flex h-max items-start justify-between gap-1 font-bold">
                    <p
                        className={`text-center opacity-0 ${modifier < 2 ? "text-4xl" : "text-2xl"}`}
                    >
                        {getModifier(grade, modifier)}
                    </p>
                    <Button
                        variant="none"
                        className="flex h-max p-0 font-bold"
                        onClick={() => {
                            handleGradeChange(grade < grades ? grade + 1 : 0);
                        }}
                    >
                        <h1 className="text-8xl">{"V" + grade}</h1>
                    </Button>
                    <p
                        className={`text-center opacity-50 ${modifier < 2 ? "text-4xl" : "text-2xl"}`}
                    >
                        {getModifier(grade, modifier)}
                    </p>
                </div>
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    variant="none"
                    onClick={() => {
                        handleGradeChange(grade < grades ? grade + 1 : 0);
                    }}
                >
                    <ChevronUp className="h-6 w-6" />
                </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
                {modifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`${i !== 3 ? "h-12 w-12 rounded-full border p-2 text-foreground" : "p-0"} ${modifier === i && modifier !== 3 ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => {
                            const mod = modifier === i ? 3 : i;
                            setModifier(mod);
                            setHueco({
                                ...hueco,
                                grade: getFullGrade(grade, mod),
                            });
                        }}
                    >
                        <p className="text-2xl">
                            {mod ? mod : <X size={20} />}
                        </p>
                    </Button>
                ))}
            </div>
        </div>
    );
}
