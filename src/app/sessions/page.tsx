import {
    getCurrentUsersClimbs,
    getCurrentUsersSessions,
} from "~/server/queries";
import { TopNav } from "../_components/topnav";
import { Button } from "~/components/ui/button";
import SessionDrawer from "~/common/sessiondrawer/sessiondrawer";
import SessionClimbs from "../_components/sessionclimbs";
import type { Session } from "~/server/db/schema";
import { grades } from "../utils/grades";

export default async function SessionsPage() {
    const sessions = (await getCurrentUsersSessions()) as Session[];
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
                    <div className="space-y-2">
                        {sessions.map((session) => (
                            <SessionDrawer
                                climbs={SessionClimbs(session.id)}
                                isEdit={true}
                                session={session}
                                key={session.id}
                            >
                                <div className="space-y-1 border-b">
                                    <p className="text-xs text-foreground/50">
                                        {new Date(
                                            session.date,
                                        ).toLocaleDateString("en-US")}
                                    </p>
                                    <h1 className="text-2xl">{session.name}</h1>

                                    <div className="flex justify-between px-6 py-3 font-semibold">
                                        <div className="text-center">
                                            <div className="text-4xl">
                                                {climbs
                                                    .filter(
                                                        (climb) =>
                                                            climb.sessionId ===
                                                            session.id.toString(),
                                                    )
                                                    .map(
                                                        (climb) =>
                                                            grades.find(
                                                                (grade) =>
                                                                    grade.value ===
                                                                    climb.grade,
                                                            )?.gradeValue,
                                                    )
                                                    .reduce(
                                                        (acc: number, grade) =>
                                                            acc + (grade ?? 0),
                                                        0,
                                                    )}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                V-points
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-4xl">
                                                {climbs.length}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                Climbs sent
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-4xl">
                                                {climbs
                                                    .filter(
                                                        (climb) =>
                                                            climb.sessionId ===
                                                            session.id.toString(),
                                                    )
                                                    .map(
                                                        (climb) =>
                                                            climb.attempts ?? 0,
                                                    )
                                                    .reduce(
                                                        (acc: number, grade) =>
                                                            acc + (grade ?? 0),
                                                        0,
                                                    )}
                                            </div>{" "}
                                            <p className="text-xs font-light text-foreground/50">
                                                Attempts
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
