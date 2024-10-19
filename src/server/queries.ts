import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { climbs } from "./db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { grades } from "~/app/utils/grades";

export async function getCurrentUsersClimbs() {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return climbs;
}

export async function getCurrentUsersSessions() {
    const user = auth();
    if (!user.userId) return [];

    const sessions = await db.query.sessions.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return sessions;
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
