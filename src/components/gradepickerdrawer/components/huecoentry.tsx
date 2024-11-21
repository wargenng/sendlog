import { Ban, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Climb } from "~/server/db/schema";

interface HuecoEntryProps {
    hueco: Climb;
    setHueco: (hueco: Climb) => void;
}

export function HuecoEntry({ hueco, setHueco }: HuecoEntryProps) {
    const modifiers = ["-", "", "+", "/"];
    const grades = 17;
    const [grade, setGrade] = useState(0);
    const [modifier, setModifier] = useState(1);
    const fullGrade =
        "V" +
        (modifiers[modifier] === ""
            ? grade
            : modifiers[modifier] === "/"
              ? `${grade}/${grade + 1}`
              : `${grade}${modifiers[modifier]}`);

    useEffect(() => {
        setHueco({ ...hueco, grade: fullGrade });
    }, [fullGrade]);

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4 pb-12">
            <div className="flex items-center justify-center gap-4">
                {modifiers.map((mod, i) => (
                    <Button
                        key={mod + i}
                        variant="none"
                        className={`flex space-x-1 rounded-none p-2 text-foreground ${modifier === i ? "border-b border-primary" : ""}`}
                        onClick={() => {
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
                        setGrade(grade < grades ? grade + 1 : 0);
                    }}
                >
                    {fullGrade}
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