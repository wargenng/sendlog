"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export async function getUsersSessions() {
    const user = auth();
    if (!user.userId) return [];

    const sessions = await db.query.sessions.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.date),
    });

    return sessions;
}
