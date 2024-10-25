import { auth } from "@clerk/nextjs/server";
import "server-only";
import { grades } from "~/app/utils/grades";
import { locations } from "~/app/utils/locations";
import { db } from "../db";
import type { Climb } from "../db/schema";

export async function getCurrentUsersClimbs() {
    const user = auth();
    if (!user.userId) return [];

    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => [desc(model.sendDate), desc(model.id)],
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
