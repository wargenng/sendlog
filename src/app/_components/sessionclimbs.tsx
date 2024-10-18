import { getUserSessionClimbs } from "~/server/queries";

export default async function SessionClimbs(sessionId: number) {
    const climbs = await getUserSessionClimbs(sessionId);

    return (
        <div>
            {climbs.map((climb) => (
                <div key={climb.id}>
                    <p>{climb.name}</p>
                    <p>{climb.grade}</p>
                </div>
            ))}
        </div>
    );
}
