"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface SnapshotClientProps {
    climbs: number;
    sessions: number;
    locations: number;
}

export function SnapshotClient({
    climbs = 0,
    sessions = 0,
    locations = 0,
}: SnapshotClientProps) {
    const { user } = useUser();

    return (
        <Link href={`/${user?.username}`}>
            <div className="w-full space-y-6 bg-secondary p-4">
                <div className="flex items-center justify-between text-sm">
                    <p>Your Weekly Snapshot</p>
                    <p className="text-accent">See More</p>
                </div>
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-xs text-foreground/50">Climbs</p>
                        <p className="text-sm">{climbs}</p>
                    </div>
                    <div>
                        <p className="text-xs text-foreground/50">Sessions</p>
                        <p className="text-sm">{sessions}</p>
                    </div>
                    <div>
                        <p className="text-xs text-foreground/50">Locations</p>
                        <p className="text-sm">{locations}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
