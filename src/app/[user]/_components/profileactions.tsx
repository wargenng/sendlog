import { clerkClient } from "@clerk/nextjs/server";
import { getIsUserProfile } from "~/app/api/climbActions";
import { getIsFriend } from "~/app/api/friendActions";
import { EditProfile } from "./editprofile";
import { AddFriend } from "./friends/addfriend";
import { RemoveFriend } from "./friends/removefriend";
import { ShareProfile } from "./shareprofile";

interface ProfileActionsProps {
    userId: string;
}

export async function ProfileActions({ userId }: ProfileActionsProps) {
    const isCurrectUser = await getIsUserProfile(userId);
    const isFriends = await getIsFriend(userId);
    const response = await clerkClient().users.getUserList();
    const username =
        response.data.find((user) => user.id === userId)?.username ?? "";

    return (
        <div className="flex gap-2">
            {isCurrectUser ? (
                <EditProfile />
            ) : isFriends ? (
                <RemoveFriend userId={userId} />
            ) : (
                <AddFriend userId={userId} />
            )}
            <ShareProfile username={username} />
        </div>
    );
}
