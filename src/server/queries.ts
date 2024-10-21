import { auth } from "@clerk/nextjs/server";
import "server-only";
import { grades } from "~/app/utils/grades";
import { locations } from "~/app/utils/locations";
import { db } from "./db";
import type { Session } from "./db/schema";

export async function getCurrentUsersClimbs() {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.sendDate),
        limit: 3,
    });

    return climbs;
}

export async function getCurrentUsersVpoints() {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.sendDate),
    });

    const outdoorvpoints = climbs
        .filter(
            (climb: Climb) =>
                locations.find((location) => location.id === climb.location)
                    ?.type === "Outdoors",
        )
        .reduce(
            (sum: number, climb: Climb) =>
                sum +
                (grades.find((grade) => grade.label === climb.grade)
                    ?.gradeValue ?? 0),
            0,
        );

    const indoorvpoints = climbs
        .filter(
            (climb: Climb) =>
                locations.find((location) => location.id === climb.location)
                    ?.type === "Indoors",
        )
        .reduce(
            (sum: number, climb: Climb) =>
                sum +
                (grades.find((grade) => grade.label === climb.grade)
                    ?.gradeValue ?? 0),
            0,
        );

    const totalvpoints = climbs.reduce(
        (sum: number, climb: Climb) =>
            sum +
            (grades.find((grade) => grade.label === climb.grade)?.gradeValue ??
                0),
        0,
    );

    return { outdoorvpoints, indoorvpoints, totalvpoints };
}

export async function getCurrentUsersGradeDistribution() {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.sendDate),
    });

    const highestGradeSent = Array.from({ length: 18 }, (_, i) => i).map(
        (grade: number) =>
            climbs.filter(
                (climb: Climb) =>
                    grades.find((grade) => grade.label === climb.grade)
                        ?.gradeValue === grade,
            ).length,
    );

    const lastIndexGreaterThanZero =
        highestGradeSent
            .map((count, index) => (count > 0 ? index : -1))
            .filter((index) => index !== -1)
            .pop() ?? 0;

    const climbsData = Array.from(
        { length: lastIndexGreaterThanZero + 1 },
        (_, i) => i,
    ).map((grade: number) => ({
        grade: "V" + grade.toString(),
        outdoors: climbs.filter(
            (climb: Climb) =>
                grades.find((grade) => grade.label === climb.grade)
                    ?.gradeValue === grade &&
                locations.find((location) => location.id === climb.location)
                    ?.type === "Outdoors",
        ).length,
        indoors: climbs.filter(
            (climb: Climb) =>
                grades.find((grade) => grade.label === climb.grade)
                    ?.gradeValue === grade &&
                locations.find((location) => location.id === climb.location)
                    ?.type === "Indoors",
        ).length,
    }));

    return climbsData;
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

export interface SessionWithClimbs extends Session {
    climbs: Climb[];
    highestGrade: string;
    totalAttempts: number;
    totalVpoints: number;
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

export async function getUsersClimbs(userId: string) {
    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return climbs;
}

export async function getUsersHighestGrade(userId: string) {
    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
    });

    const highestGradeObj = grades.find(
        (grade) =>
            grade.ranking ===
            climbs
                .map(
                    (climb) =>
                        grades.find((grade) => grade.label === climb.grade)
                            ?.ranking,
                )
                .reduce((acc: number, grade) => {
                    if (grade !== undefined && grade > acc) {
                        return grade;
                    }
                    return acc;
                }, 0),
    );

    const highestGrade = highestGradeObj ? highestGradeObj.label : "N/A";

    return highestGrade;
}

export async function getUsersSessions(userId: string) {
    const sessions = await db.query.sessions.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return sessions;
}

interface Climb {
    id: number;
    name: string;
    grade: string;
    attempts: number | null;
    rating: number | null;
    location: number;
    notes: string | null;
    sendDate: Date;
    isRepeat: boolean | null;
    isSend: boolean | null;
    userId: string;
    sessionId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}
