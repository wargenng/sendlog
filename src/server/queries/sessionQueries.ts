import { auth } from "@clerk/nextjs/server";
import "server-only";
import { grades } from "~/app/utils/grades";
import { db } from "../db";
import type { Climb, Session } from "../db/schema";

export interface SessionWithClimbs extends Session {
    climbs: Climb[];
    highestGrade: string;
    totalAttempts: number;
    totalVpoints: number;
}

export async function getCurrentUsersSessions() {
    const user = auth();
    if (!user.userId) return [];

    const sessions = await db.query.sessions.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.date),
    });

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });

    return sessionWithFields(sessions as Session[], climbs);
}

export async function getCurrentUsersSessionsWithFollowing() {
    const user = auth();
    if (!user.userId) return [];

    const following = await db.query.friendships.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });

    const users = following.map((follow) => follow.friendId);
    users.push(user.userId);

    const sessions = await db.query.sessions.findMany({
        where: (model, { inArray }) => inArray(model.userId, users),
        orderBy: (model, { desc }) => desc(model.date),
    });

    const climbs = await db.query.climbs.findMany({
        where: (model, { inArray }) => inArray(model.userId, users),
    });

    return sessionWithFields(sessions as Session[], climbs);
}

export async function getUserSessionClimbs(sessionId: number) {
    const user = auth();
    if (!user.userId) return [];

    const sessionClimbs = await db.query.climbs.findMany({
        where: (model, { and, eq }) =>
            and(
                eq(model.userId, user.userId),
                eq(model.sessionId, sessionId.toString()),
            ),
    });

    return sessionClimbs;
}

function sessionWithFields(sessions: Session[], climbs: Climb[]) {
    return sessions.map((session) => {
        const sessionClimbs = climbs.filter(
            (climb) => climb.sessionId === session.id.toString(),
        );
        const highestGrade =
            grades.find(
                (grade) =>
                    sessionClimbs
                        .map(
                            (climb) =>
                                grades.find(
                                    (grade) => grade.value === climb.grade,
                                )?.ranking,
                        )
                        .sort((a, b) => (b ?? 0) - (a ?? 0))[0] ===
                    grade.ranking,
            )?.value ?? "N/A";

        const totalAttempts = sessionClimbs
            .map((climb) => climb.attempts ?? 0)
            .reduce((acc: number, grade) => acc + grade, 0);

        const totalVpoints = sessionClimbs
            .map((climb) => grades.find((grade) => grade.label === climb.grade))
            .reduce((acc: number, grade) => acc + (grade?.gradeValue ?? 0), 0);

        return {
            ...session,
            climbs: sessionClimbs,
            highestGrade,
            totalAttempts,
            totalVpoints,
        };
    });
}
