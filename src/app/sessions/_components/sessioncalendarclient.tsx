"use client";

import { useState } from "react";
import { ClimbCard } from "~/app/_components/climbs/climbcard";
import { Calendar } from "~/components/ui/calendar";
import type { Climb } from "~/server/db/schema";
import "../_styles/calendar.css";

interface SessionCalendarProps {
    climbs: Climb[];
}

export function SessionCalendarClient({ climbs }: SessionCalendarProps) {
    const [date, setDate] = useState(new Date());
    const filteredClimbs = climbs.filter((climb) => {
        const climbDate = new Date(climb.sendDate);
        return (
            climbDate.getFullYear() === date.getFullYear() &&
            climbDate.getMonth() === date.getMonth() &&
            climbDate.getDate() === date.getDate()
        );
    });
    const uniqueClimbDates = [
        ...new Set(climbs.map((climb) => climb.sendDate)),
    ];

    return (
        <div className="flex w-full flex-col justify-center space-y-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => day && setDate(day)}
                className="flex justify-center rounded-md border bg-secondary/50"
                modifiers={{
                    highlight: uniqueClimbDates,
                }}
                modifiersClassNames={{
                    highlight:
                        "highlight rounded-md flex items-center justify-center",
                }}
            />
            <div className="space-y-2">
                <h1 className="text-base font-semibold">
                    climbs sent on{" "}
                    {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })}
                </h1>
                {filteredClimbs.length ? (
                    <div className="flex flex-col gap-2 rounded-lg">
                        {filteredClimbs.map((climb) => (
                            <ClimbCard climb={climb} key={climb.id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-foreground/50">
                        No climbs on this day
                    </p>
                )}
            </div>
        </div>
    );
}
