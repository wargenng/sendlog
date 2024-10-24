"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { friendships } from "~/server/db/schema";

export const addFriend = async (friendId: string) => {
    const user = auth();
    if (!user.userId) return [];

    await Promise.all([
        db.insert(friendships).values({
            userId: user.userId,
            friendId: friendId,
        }),
        db.insert(friendships).values({
            userId: friendId,
            friendId: user.userId,
        }),
    ]);

    revalidatePath("/");
};

export const getUsersFriends = async () => {
    const user = auth();
    if (!user.userId) return [];

    const friends = await db.query.friendships.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });

    return friends;
};

export const getProfileFriends = async (userId: string) => {
    const friends = await db.query.friendships.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
    });

    return friends;
};
