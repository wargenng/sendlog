"use client";

import { useState } from "react";
import { ClimbCard } from "~/app/_components/climbs/climbcard";
import { Calendar } from "~/components/ui/calendar";
import { Climb } from "~/server/db/schema";

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
        <div className="flex w-full flex-col justify-center space-y-2">
            <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => day && setDate(day)}
                className="flex justify-center rounded-md border bg-secondary/50"
                modifiers={{
                    highlight: uniqueClimbDates,
                }}
                modifiersClassNames={{
                    highlight: "bg-red-500",
                }}
            />
            <div className="space-y-2">
                <h1 className="text-base font-semibold"></h1>
                {filteredClimbs.length ? (
                    <div className="flex flex-col gap-2 rounded-lg bg-secondary/50 p-4">
                        {filteredClimbs.map((climb) => (
                            <ClimbCard
                                climb={climb}
                                isLastCard={
                                    filteredClimbs.indexOf(climb) !==
                                    filteredClimbs.length - 1
                                }
                                key={climb.id}
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
