"use client";

import { useState } from "react";
import { ClimbCard } from "~/components/climbs/climbcard";
import { Calendar } from "~/components/ui/calendar";
import type { Climb } from "~/server/db/schema";
import "./_styles/calendar.css";

interface ClimbCalendarProps {
    climbs: Climb[];
}

export function ClimbCalendarClient({ climbs }: ClimbCalendarProps) {
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
                className="flex justify-center bg-secondary"
                modifiers={{
                    highlight: uniqueClimbDates,
                }}
                modifiersClassNames={{
                    highlight:
                        "highlight rounded-md flex items-center justify-center",
                }}
            />
            <div className="space-y-2">
                {filteredClimbs.length ? (
                    <div className="flex flex-col gap-2 rounded-lg">
                        {filteredClimbs.map((climb) => (
                            <ClimbCard
                                climb={climb}
                                key={climb.id}
                                isProfile={true}
                            />
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
