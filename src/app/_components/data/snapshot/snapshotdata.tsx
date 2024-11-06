interface SnapshotClientProps {
    climbs: number;
    sessions: number;
    locations: number;
}

export function SnapshotData({
    climbs = 0,
    sessions = 0,
    locations = 0,
}: SnapshotClientProps) {
    return (
        <div className="flex items-center gap-6">
            <div className="space-y-1">
                <p className="text-xs text-foreground/50">Climbs</p>
                <p className="text-sm">{climbs}</p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-foreground/50">Sessions</p>
                <p className="text-sm">{sessions}</p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-foreground/50">Locations</p>
                <p className="text-sm">{locations}</p>
            </div>
        </div>
    );
}
