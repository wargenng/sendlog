import { ChevronRight } from "lucide-react";
import SessionDrawer from "~/common/sessiondrawer/sessiondrawer";
import { Button } from "~/components/ui/button";
import {
    getCurrentUsersClimbs,
    getCurrentUsersSessions,
    SessionWithClimbs,
} from "~/server/queries";
import SessionClimbs from "../_components/sessionclimbs";
import { TopNav } from "../_components/topnav";
import { locations } from "../utils/locations";

export default async function SessionsPage() {
    const sessions = (await getCurrentUsersSessions()) as SessionWithClimbs[];
    const climbs = await getCurrentUsersClimbs();

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
                <div className="space-y-2">
                    <h1 className="border-b text-base font-bold">
                        recent sessions
                    </h1>
                    <div className="flex flex-col gap-2 rounded-lg bg-secondary/50 p-4">
                        {sessions.map((session) => (
                            <SessionDrawer
                                climbs={SessionClimbs(session.id)}
                                isEdit={true}
                                session={session}
                                key={session.id}
                            >
                                <div
                                    className={`space-y-1 ${sessions.indexOf(session) === sessions.length - 1 ? "" : "border-b"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-xl">
                                            {session.name}
                                        </h1>
                                        <ChevronRight className="h-6 w-6 text-foreground/50" />
                                    </div>
                                    <p className="text-xs text-foreground/50">
                                        {locations[session.location - 1]?.label}{" "}
                                        ·{" "}
                                        {
                                            locations[session.location - 1]
                                                ?.location
                                        }
                                        ,{" "}
                                        {locations[session.location - 1]?.state}
                                    </p>
                                    <p className="text-xs text-foreground/50">
                                        {new Date(
                                            session.date,
                                        ).toLocaleDateString("en-US")}
                                    </p>
                                    <div>
                                        <p className="flex flex-wrap text-xs font-light italic text-foreground/50">
                                            {session.notes}
                                        </p>
                                    </div>
                                    <div className="flex justify-between py-2 font-semibold">
                                        <div className="w-1/4">
                                            <div className="text-2xl">
                                                {session.highestGrade}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                Highest grade
                                            </p>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="text-2xl">
                                                {session.climbs.length}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                Climbs sent
                                            </p>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="text-2xl">
                                                {session.totalAttempts}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                Attempts
                                            </p>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="text-2xl">
                                                {session.totalVpoints}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                V-points
                                            </p>
                                        </div>
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
