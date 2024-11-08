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
        <div className="flex items-center gap-12">
            <div className="space-y-1">
                <p className="text-xs text-foreground/50">Climbs</p>
                <p className="text-lg">{climbs}</p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-foreground/50">Sessions</p>
                <p className="text-lg">{sessions}</p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-foreground/50">Locations</p>
                <p className="text-lg">{locations}</p>
            </div>
        </div>
    );
}
