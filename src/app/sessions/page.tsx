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
import { locations } from "../utils/locations";

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
                        {sessions
                            .sort(
                                (a, b) =>
                                    new Date(b.date).getTime() -
                                    new Date(a.date).getTime(),
                            )
                            .map((session) => (
                                <SessionDrawer
                                    climbs={SessionClimbs(session.id)}
                                    isEdit={true}
                                    session={session}
                                    key={session.id}
                                >
                                    <div className="space-y-1 border-b">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-thin">
                                                {
                                                    locations[
                                                        session.location - 1
                                                    ]?.label
                                                }{" "}
                                                ·{" "}
                                                {
                                                    locations[
                                                        session.location - 1
                                                    ]?.location
                                                }
                                                ,{" "}
                                                {
                                                    locations[
                                                        session.location - 1
                                                    ]?.state
                                                }
                                            </p>
                                            <p className="text-xs text-foreground/50">
                                                {new Date(
                                                    session.date,
                                                ).toLocaleDateString("en-US")}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-xl">
                                                {session.name}
                                            </h1>
                                        </div>
                                        <div>
                                            <p className="text-xs font-light italic text-foreground/50">
                                                {session.notes}
                                            </p>
                                        </div>
                                        <div className="flex justify-between py-2 font-semibold">
                                            <div className="w-1/4">
                                                <div className="text-2xl">
                                                    {grades.find(
                                                        (grade) =>
                                                            climbs
                                                                .filter(
                                                                    (climb) =>
                                                                        climb.sessionId ===
                                                                        session.id.toString(),
                                                                )
                                                                .map(
                                                                    (climb) =>
                                                                        grades.find(
                                                                            (
                                                                                grade,
                                                                            ) =>
                                                                                grade.value ===
                                                                                climb.grade,
                                                                        )
                                                                            ?.ranking,
                                                                )
                                                                .sort(
                                                                    (a, b) =>
                                                                        (b ??
                                                                            0) -
                                                                        (a ??
                                                                            0),
                                                                )[0] ===
                                                            grade.ranking,
                                                    )?.value ?? "N/A"}
                                                </div>{" "}
                                                <p className="text-xs font-light text-foreground/50">
                                                    Highest grade
                                                </p>
                                            </div>
                                            <div className="w-1/4">
                                                <div className="text-2xl">
                                                    {
                                                        climbs.filter(
                                                            (climb) =>
                                                                climb.sessionId ===
                                                                session.id.toString(),
                                                        ).length
                                                    }
                                                </div>{" "}
                                                <p className="text-xs font-light text-foreground/50">
                                                    Climbs sent
                                                </p>
                                            </div>
                                            <div className="w-1/4">
                                                <div className="text-2xl">
                                                    {climbs
                                                        .filter(
                                                            (climb) =>
                                                                climb.sessionId ===
                                                                session.id.toString(),
                                                        )
                                                        .map(
                                                            (climb) =>
                                                                climb.attempts ??
                                                                0,
                                                        )
                                                        .reduce(
                                                            (
                                                                acc: number,
                                                                grade,
                                                            ) =>
                                                                acc +
                                                                (grade ?? 0),
                                                            0,
                                                        )}
                                                </div>{" "}
                                                <p className="text-xs font-light text-foreground/50">
                                                    Attempts
                                                </p>
                                            </div>
                                            <div className="w-1/4">
                                                <div className="text-2xl">
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
                                                            (
                                                                acc: number,
                                                                grade,
                                                            ) =>
                                                                acc +
                                                                (grade ?? 0),
                                                            0,
                                                        )}
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
