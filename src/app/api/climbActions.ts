"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

    revalidatePath("/");
};

export const editClimb = async (
    id: number,
    name: string,
    grade: string,
    attempts: number,
    rating: number,
    notes: string,
    location: number,
) => {
    const user = auth();
    if (!user.userId) return [];

    await db
        .update(climbs)
        .set({
            name: name,
            grade: grade,
            attempts: attempts,
            rating: rating,
            notes: notes,
            location: location,
        })
        .where(eq(climbs.id, id));

    revalidatePath("/");
};

export async function deleteClimb(id: number) {
    const user = auth();
    if (!user.userId) return [];

    await db
        .delete(climbs)
        .where(and(eq(climbs.id, id), eq(climbs.userId, user.userId)));

    revalidatePath("/");
}
