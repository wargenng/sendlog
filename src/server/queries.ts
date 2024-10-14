import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { climbs } from "./db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function getCurrentUsersSessions() {
  const user = auth();
  if (!user.userId) return [];

  const sessions = await db.query.sessions.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  const sessionsWithClimbs = await Promise.all(
    sessions.map(async (session) => {
      const sessionClimbs = await db.query.climbs.findMany({
        where: (model, { eq }) => eq(model.sessionId, session.id.toString()),
      });
      return { ...session, climbs: sessionClimbs };
    }),
  );

  return sessionsWithClimbs;
}

export const addClimb = async (name: string, grade: string) => {
  const user = auth();
  if (!user.userId) return [];

  await db.insert(climbs).values({
    userId: user.userId,
    sessionId: "3", // Replace with the actual session ID
    name: name,
    grade: grade,
  });
};

export async function deleteClimb(id: number) {
  const user = auth();
  if (!user.userId) return [];

  await db
    .delete(climbs)
    .where(and(eq(climbs.id, id), eq(climbs.userId, user.userId)));

  revalidatePath("/");
}
