"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { climbs } from "~/server/db/schema";

export const addClimb = async (name: string, grade: string) => {
    console.log(`adding climb ${name} ${grade}`);
    const user = auth();
    if (!user.userId) return [];

    await db.insert(climbs).values({
        userId: user.userId,
        sessionId: "3", // Replace with the actual session ID
        name: name,
        grade: grade,
    });
};
