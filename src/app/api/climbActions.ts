"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { climbs, Session, sessions } from "~/server/db/schema";
import { getCurrentUsersSessions } from "~/server/queries";

export const addClimb = async (
    name: string,
    grade: string,
    attempts: number,
    rating: number,
    notes: string,
    location: number,
    date: Date,
    sessionId?: number,
) => {
    console.log(`adding climb ${name} ${grade}`);
    const user = auth();
    if (!user.userId) return [];

    let session;
    if (sessionId) {
        session = { id: sessionId };
    }
    if (!session) {
        const currentsessions = await getCurrentUsersSessions();
        let session = currentsessions.find(
            (session) =>
                session.date.getDate() === date.getDate() &&
                session.date.getMonth() === date.getMonth() &&
                session.date.getFullYear() === date.getFullYear(),
        );
        if (!session) {
            console.log("no session found, creating one");
            await db.insert(sessions).values({
                userId: user.userId,
                name: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                location: location,
                date: date,
            });
            const currentsessions = await getCurrentUsersSessions();
            session = currentsessions.find(
                (session) =>
                    session.date.getDate() === date.getDate() &&
                    session.date.getMonth() === date.getMonth() &&
                    session.date.getFullYear() === date.getFullYear(),
            );
        }
    }

    await db.insert(climbs).values({
        userId: user.userId,
        name: name,
        grade: grade,
        attempts: attempts,
        rating: rating,
        notes: notes,
        location: location,
        sendDate: date,
        sessionId: session ? session.id.toString() : "",
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
    date: Date,
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
            sendDate: date,
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

export async function addSession(session: Session) {
    const user = auth();
    if (!user.userId) return [];

    await db.insert(sessions).values({
        userId: user.userId,
        name: session.name,
        date: session.date,
        notes: session.notes,
        location: session.location,
    });

    revalidatePath("/");
}

export async function editSession(session: Session) {
    const user = auth();
    if (!user.userId) return [];

    await db
        .update(sessions)
        .set({
            name: session.name,
            date: session.date,
            notes: session.notes,
            location: session.location,
        })
        .where(eq(sessions.id, session.id));

    revalidatePath("/");
}

export async function deleteSession(id: number) {
    const user = auth();
    if (!user.userId) return [];

    await db
        .delete(sessions)
        .where(and(eq(sessions.id, id), eq(sessions.userId, user.userId)));

    revalidatePath("/");
}
