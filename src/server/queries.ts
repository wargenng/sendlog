import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { posts } from "./db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) return [];

  const posts = await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return posts;
}

export async function deletePost(id: number) {
  const user = auth();
  if (!user.userId) return [];

  await db
    .delete(posts)
    .where(and(eq(posts.id, id), eq(posts.userId, user.userId)));

  revalidatePath("/");
}
