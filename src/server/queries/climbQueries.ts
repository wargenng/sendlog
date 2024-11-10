import { auth } from "@clerk/nextjs/server";
import "server-only";
import { grades } from "~/app/utils/grades";
import { locations } from "~/app/utils/locations";
import { db } from "../db";
import { climbs, type Climb } from "../db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getCurrentUsersClimbs() {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => [desc(model.sendDate), desc(model.id)],
    });

    return climbs;
}

export async function getProfileUsersClimbs(userId: string) {
    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
        orderBy: (model, { desc }) => [desc(model.sendDate), desc(model.id)],
    });

    return climbs;
}

export async function getUsersWeeklySnapshot() {
    const user = auth();
    if (!user.userId) return [];

    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const climbs = await db.query.climbs.findMany({
        where: (model, { and, eq, gte, lte }) =>
            and(
                eq(model.userId, user.userId),
                gte(model.sendDate, startOfWeek),
                lte(model.sendDate, endOfWeek),
            ),
    });

    const climbsAmount = climbs.length;
    const sessionAmount = new Set(climbs.map((climb) => climb.sessionId)).size;
    const locationAmount = new Set(climbs.map((climb) => climb.location)).size;

    return [climbsAmount, sessionAmount, locationAmount];
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

    const filteredgradedistibution = climbsData.map((grade) => ({
        ...grade,
        outdoors: grade.outdoors === 0 ? null : grade.outdoors,
        indoors: grade.indoors === 0 ? null : grade.indoors,
    }));

    return filteredgradedistibution;
}
