import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import { grades } from "../../../app/utils/grades";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "~/components/ui/dropdown-menu";

interface GradeComboboxProps {
    grade: string;
    setGrade: (grade: string) => void;
}

export function GradeCombobox({ grade, setGrade }: GradeComboboxProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {grade
                        ? grades.find((g) => g.value === grade)?.label
                        : "Select grade..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="overflow-y-auto">
                <Command>
                    <CommandInput
                        placeholder="Search grade..."
                        className="text-base"
                    />
                    <CommandList>
                        <CommandEmpty>No grade found.</CommandEmpty>
                        <CommandGroup>
                            {grades.map((g) => (
                                <CommandItem
                                    key={g.value}
                                    value={g.value.toString()}
                                    onSelect={(currentValue) => {
                                        setGrade(
                                            currentValue === grade
                                                ? ""
                                                : currentValue,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            grade === g.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {g.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
