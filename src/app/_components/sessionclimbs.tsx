import { getUserSessionClimbs } from "~/server/queries";

export default async function SessionClimbs(sessionId: number) {
    const climbs = await getUserSessionClimbs(sessionId);

    return (
        <div>
            {climbs.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 rounded border p-4">
                    {climbs.map((climb) => (
                        <div
                            key={climb.id}
                            className="flex items-center space-y-1"
                        >
                            <p>
                                {climb.name} {climb.grade}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-foreground/50">No climbs found</p>
            )}
        </div>
    );
}
