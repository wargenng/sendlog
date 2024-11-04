"use client";

export function SnapshotClient() {
    return (
        <div className="w-full space-y-4 bg-secondary p-4">
            <div className="flex items-center justify-between text-sm">
                <p>Your Weekly Snapshot</p>
                <p className="text-accent">See More</p>
            </div>
            <div className="flex items-center gap-6">
                <div>
                    <p className="text-xs">Climbs</p>
                    <p className="text-xl">12</p>
                </div>
                <div>
                    <p className="text-xs">Sessions</p>
                    <p className="text-xl">3</p>
                </div>
                <div>
                    <p className="text-xs">Projects</p>
                    <p className="text-xl">2</p>
                </div>
            </div>
        </div>
    );
}
