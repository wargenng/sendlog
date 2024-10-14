"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { climbs } from "~/server/db/schema";

export const addClimb = async (
    name: string,
    grade: string,
    attempts: number,
    rating: number,
    notes: string,
    location: number,
) => {
    console.log(`adding climb ${name} ${grade}`);
    const user = auth();
    if (!user.userId) return [];

    await db.insert(climbs).values({
        userId: user.userId,
        name: name,
        grade: grade,
        attempts: attempts,
        rating: rating,
        notes: notes,
        location: location,
    });
};
