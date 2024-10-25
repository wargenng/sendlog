import "server-only";
import { grades } from "~/app/utils/grades";
import { db } from "../db";

export async function getUsersClimbs(userId: string) {
    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return climbs;
}

export async function getUsersClimbsLimited(userId: string) {
    const climbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
        orderBy: (model, { desc }) => [desc(model.sendDate), desc(model.id)],
        limit: 3,
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
