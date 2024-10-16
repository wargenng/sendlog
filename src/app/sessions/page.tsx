import { getCurrentUsersSessions } from "~/server/queries";
import { TopNav } from "../_components/topnav";

export default async function SessionsPage() {
    const sessions = await getCurrentUsersSessions();

    return (
        <main className="">
            <TopNav title="sessions" />
            <div className="mt-20 px-6 pb-32">
                <h1 className="border-b text-2xl font-bold">recent sessions</h1>
                <div className="space-y-2">
                    {sessions.map((session) => (
                        <div key={session.id}>
                            <p>{session.name}</p>
                            <p>
                                {new Date(session.date).toLocaleDateString(
                                    "en-US",
                                )}
                            </p>
                            <div>
                                {session.climbs.map((climb) => (
                                    <div key={climb.id}>
                                        <p>{climb.name}</p>
                                        <p>{climb.grade}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
