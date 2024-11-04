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

    const sessionsWithClimbs = await Promise.all(
        sessions.map(async (session) => {
            const climbs = await db.query.climbs.findMany({
                where: (model, { eq }) =>
                    eq(model.sessionId, session.id.toString()),
            });

            return { ...session, climbs };
        }),
    );

    const sessionsWithClimbsAndHighestGrade = await Promise.all(
        sessionsWithClimbs.map(async (session) => {
            const highestGrade = await getUserSessionClimbsHighestGrade(
                session.id,
            );

            return { ...session, highestGrade };
        }),
    );

    const sessionsWithClimbsAndTotalAttempts = await Promise.all(
        sessionsWithClimbsAndHighestGrade.map(async (session) => {
            const totalAttempts = await getUserSessionClimbsTotalAttempts(
                session.id,
            );

            return { ...session, totalAttempts };
        }),
    );

    const sessionsWithClimbsAndTotalVpoints = await Promise.all(
        sessionsWithClimbsAndTotalAttempts.map(async (session) => {
            const totalVpoints = await getUserSessionClimbsTotalVpoints(
                session.id,
            );

            return { ...session, totalVpoints };
        }),
    );

    return sessionsWithClimbsAndTotalVpoints;
}

export async function getCurrentUsersSessionsWithFollowing() {
    const user = auth();
    if (!user.userId) return [];

    const following = await db.query.friendships.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });

    const users = following.map((follow) => follow.friendId);
    users.push(user.userId);

    const sessions = await Promise.all(
        users.map(async (userId) => {
            const sessions = await db.query.sessions.findMany({
                where: (model, { eq }) => eq(model.userId, userId),
                orderBy: (model, { desc }) => desc(model.date),
            });

            return sessions;
        }),
    );
    const flattenedSessions = sessions
        .flat()
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

    const sessionsWithClimbs = await Promise.all(
        flattenedSessions.map(async (session) => {
            const climbs = await db.query.climbs.findMany({
                where: (model, { eq }) =>
                    eq(model.sessionId, session.id.toString()),
            });

            return { ...session, climbs };
        }),
    );

    const sessionsWithClimbsAndHighestGrade = await Promise.all(
        sessionsWithClimbs.map(async (session) => {
            const highestGrade = await getUserSessionClimbsHighestGrade(
                session.id,
            );

            return { ...session, highestGrade };
        }),
    );

    const sessionsWithClimbsAndTotalAttempts = await Promise.all(
        sessionsWithClimbsAndHighestGrade.map(async (session) => {
            const totalAttempts = await getUserSessionClimbsTotalAttempts(
                session.id,
            );

            return { ...session, totalAttempts };
        }),
    );

    const sessionsWithClimbsAndTotalVpoints = await Promise.all(
        sessionsWithClimbsAndTotalAttempts.map(async (session) => {
            const totalVpoints = await getUserSessionClimbsTotalVpoints(
                session.id,
            );

            return { ...session, totalVpoints };
        }),
    );

    return sessionsWithClimbsAndTotalVpoints;
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

export async function getUserSessionClimbsHighestGrade(sessionId: number) {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.sendDate),
    });

    return (
        grades.find(
            (grade) =>
                climbs
                    .filter((climb) => climb.sessionId === sessionId.toString())
                    .map(
                        (climb) =>
                            grades.find((grade) => grade.value === climb.grade)
                                ?.ranking,
                    )
                    .sort((a, b) => (b ?? 0) - (a ?? 0))[0] === grade.ranking,
        )?.value ?? "N/A"
    );
}

export async function getUserSessionClimbsTotalAttempts(sessionId: number) {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { and, eq }) =>
            and(
                eq(model.userId, user.userId),
                eq(model.sessionId, sessionId.toString()),
            ),
    });

    return climbs
        .map((climb) => climb.attempts ?? 0)
        .reduce((acc: number, grade) => acc + grade, 0);
}

export async function getUserSessionClimbsTotalVpoints(sessionId: number) {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { and, eq }) =>
            and(
                eq(model.userId, user.userId),
                eq(model.sessionId, sessionId.toString()),
            ),
    });

    return climbs
        .map((climb) => grades.find((grade) => grade.label === climb.grade))
        .reduce((acc: number, grade) => acc + (grade?.gradeValue ?? 0), 0);
}
