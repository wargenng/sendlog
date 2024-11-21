"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { SnapshotData } from "./snapshotdata";

interface SnapshotClientProps {
    climbs: number;
    sessions: number;
    locations: number;
}

export function SnapshotClient({
    climbs,
    sessions,
    locations,
}: SnapshotClientProps) {
    const { user } = useUser();

    return (
        <Link href={`/${user?.username}`}>
            <div className="w-full space-y-6 bg-secondary p-4">
                <div className="flex items-center justify-between text-sm">
                    <p>Your Weekly Snapshot</p>
                    <p className="text-accent-2">See More</p>
                </div>
                <SnapshotData
                    climbs={climbs}
                    sessions={sessions}
                    locations={locations}
                />
            </div>
        </Link>
    );
}
