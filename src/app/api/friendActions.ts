"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { friendships } from "~/server/db/schema";

export const addFriend = async (friendId: string) => {
    const user = auth();
    if (!user.userId) return [];

    await db.insert(friendships).values({
        userId: user.userId,
        friendId: friendId,
    });
    revalidatePath("/");
};

export const removeFriend = async (friendId: string) => {
    const user = auth();
    if (!user.userId) return [];

    await db
        .delete(friendships)
        .where(
            and(
                eq(friendships.userId, user.userId),
                eq(friendships.friendId, friendId),
            ),
        );
    revalidatePath("/");
};

export const getIsFriend = async (userId: string) => {
    const user = auth();
    if (!user.userId) return false;

    const friendship = await db.query.friendships.findMany({
        where: (model, { and, eq }) =>
            and(eq(model.userId, user.userId), eq(model.friendId, userId)),
    });

    return !!friendship[0];
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
    const response = await clerkClient().users.getUserList();
    const users = response.data;

    const friends = await db
        .select()
        .from(friendships)
        .where(eq(friendships.userId, userId));

    const friendsData = friends.map((friend) => {
        const user = users.find((user) => user.id === friend.friendId);

        return {
            id: user?.id,
            username: user?.username,
            fullname: user?.fullName,
            image: user?.imageUrl,
        };
    });

    return friendsData;
};

export const getProfileFollowers = async (userId: string) => {
    const response = await clerkClient().users.getUserList();
    const users = response.data;

    const friends = await db
        .select()
        .from(friendships)
        .where(eq(friendships.friendId, userId));

    const friendsData = friends.map((friend) => {
        const user = users.find((user) => user.id === friend.userId);

        return {
            id: user?.id,
            username: user?.username,
            fullname: user?.fullName,
            image: user?.imageUrl,
        };
    });

    return friendsData;
};
