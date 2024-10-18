import { getCurrentUsersSessions } from "~/server/queries";
import { TopNav } from "../_components/topnav";
import { Button } from "~/components/ui/button";
import SessionDrawer from "~/common/sessiondrawer/sessiondrawer";
import SessionClimbs from "../_components/sessionclimbs";

export default async function SessionsPage() {
    const sessions = await getCurrentUsersSessions();

    return (
        <main className="">
            <TopNav title="sessions" />
            <div className="mt-20 space-y-4 px-6 pb-32">
                <div>
                    <SessionDrawer>
                        <Button className="w-full text-foreground">
                            + Create Session
                        </Button>
                    </SessionDrawer>
                </div>
                <div>
                    <h1 className="border-b text-2xl font-bold">
                        recent sessions
                    </h1>
                    <div className="space-y-2">
                        {sessions.map((session) => (
                            <SessionDrawer
                                climbs={SessionClimbs(session.id)}
                                isEdit={true}
                                key={session.id}
                                name={session?.name ?? ""}
                                location={session?.location ?? 0}
                                date={session?.date ?? null}
                                notes={session?.notes ?? ""}
                                id={session.id}
                            >
                                <div className="space-y-2 border-b">
                                    <h1 className="text-2xl">{session.name}</h1>
                                    <p>
                                        {new Date(
                                            session.date,
                                        ).toLocaleDateString("en-US")}
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
                            </SessionDrawer>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
