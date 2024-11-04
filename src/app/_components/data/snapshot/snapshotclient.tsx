"use client";

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
    return (
        <div className="w-full space-y-4 bg-secondary p-4">
            <div className="flex items-center justify-between text-sm">
                <p>Your Weekly Snapshot</p>
                <p className="text-accent">See More</p>
            </div>
            <div className="flex items-center gap-6">
                <div>
                    <p className="text-xs">Climbs</p>
                    <p className="text-xl">{climbs}</p>
                </div>
                <div>
                    <p className="text-xs">Sessions</p>
                    <p className="text-xl">{sessions}</p>
                </div>
                <div>
                    <p className="text-xs">Locations</p>
                    <p className="text-xl">{locations}</p>
                </div>
            </div>
        </div>
    );
}
