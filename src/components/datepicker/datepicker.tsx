"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date ?? undefined}
                        onSelect={(day) => day && setDate(day)}
                        initialFocus
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
