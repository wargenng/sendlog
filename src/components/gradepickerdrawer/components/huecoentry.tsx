import { Ban, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";

interface HuecoEntryProps {
    hueco: Climb;
    setHueco: (hueco: Climb) => void;
}
const modifiers = ["-", "+", "/", ""];
const getFullGrade = (grade: number, modifier: number) => {
    return `V${grade}${
        modifiers[modifier] === "/" ? `/${grade + 1}` : `${modifiers[modifier]}`
    }`;
};

export function HuecoEntry({ hueco, setHueco }: HuecoEntryProps) {
    const grades = 17;
    const [grade, setGrade] = useState(0);
    const [modifier, setModifier] = useState(1);
    const handleGradeChange = (grade: number) => {
        setGrade(grade);
        setHueco({
            ...hueco,
            grade: getFullGrade(grade, modifier),
        });
    };

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4 pb-12">
            <div className="flex items-center justify-center gap-4">
                {modifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`flex h-12 w-12 space-x-1 rounded-full border p-2 text-foreground ${modifier === i ? "bg-primary text-primary-foreground" : ""}`}
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
                        handleGradeChange(grade < grades ? grade + 1 : 0);
                    }}
                >
                    {getFullGrade(grade, modifier)}
                </Button>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    variant="none"
                    onClick={() => {
                        handleGradeChange(grade < grades ? grade + 1 : 0);
                    }}
                >
                    <ChevronUp className="h-6 w-6" />
                </Button>
                <Button
                    className="flex h-12 w-12 items-center rounded-full border p-0"
                    onClick={() => {
                        handleGradeChange(grade > 0 ? grade - 1 : grades);
                    }}
                    variant="none"
                >
                    <ChevronDown className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
