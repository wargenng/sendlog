import { getUsersWeeklySnapshot } from "~/server/queries";
import { SnapshotClient } from "./snapshotclient";

export async function Snapshot() {
    const [climbs, sessions, locations] = (await getUsersWeeklySnapshot()) as [
        number,
        number,
        number,
    ];

    return (
        <SnapshotClient
            climbs={climbs}
            sessions={sessions}
            locations={locations}
        />
    );
}
