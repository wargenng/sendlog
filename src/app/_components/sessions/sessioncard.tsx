"use client";

import Image from "next/image";
import { useState } from "react";
import { locations } from "~/app/utils/locations";
import type { Climb } from "~/server/db/schema";
import type { SessionWithClimbs } from "~/server/queries";
import { SessionActions } from "./sessionactions";
import { SessionClimbCard } from "./sessionclimbcard";
import { SessionDetails } from "./sessiondetails";

interface SessionCardProps {
    session: SessionWithClimbs;
}

export function SessionCard({ session }: SessionCardProps) {
    const location = locations.find(
        (location) => location.id === session.location,
    );
    const [showClimbs, setShowClimbs] = useState(false);

    return (
        <div className="flex flex-col gap-2 bg-secondary p-4">
            <h1 className="text-base font-bold">
                {new Date(session.date).toLocaleDateString("en-US") ===
                new Date().toLocaleDateString("en-US")
                    ? "Today"
                    : new Date(session.date).toLocaleDateString("en-US")}
            </h1>
            <div className="flex w-full justify-between pb-2">
                <SessionDetails session={session}>
                    <div
                        className={`relative flex w-full items-center gap-2 overflow-hidden text-left`}
                    >
                        <Image
                            className="h-16 w-16 rounded-lg object-cover"
                            src={
                                location?.image ?? "/path/to/default/image.jpg"
                            }
                            alt="location image"
                            width={96}
                            height={96}
                        />
                        <div className={`relative w-full p-2`}>
                            <div className="flex items-center justify-between">
                                <h1 className="text-base">{session.name}</h1>
                            </div>
                            <p className="text-xs text-foreground/50">
                                Session · {location?.label}
                            </p>
                        </div>
                    </div>
                </SessionDetails>
                <SessionActions
                    session={session}
                    setShowClimbs={setShowClimbs}
                    showClimbs={showClimbs}
                />
            </div>
            <div
                className={`flex flex-col gap-4 pl-4 transition-all duration-500 ${
                    showClimbs
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                {session.climbs.map((climb: Climb) => (
                    <SessionClimbCard climb={climb} key={climb.id} />
                ))}
            </div>
        </div>
    );
}
