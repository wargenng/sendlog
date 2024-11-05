import { clerkClient } from "@clerk/nextjs/server";
import { getIsUserProfile } from "~/app/api/climbActions";
import { getIsFriend } from "~/app/api/friendActions";
import { EditProfile } from "./components/editprofile";
import { AddFriend } from "./components/addfriend";
import { RemoveFriend } from "./components/removefriend";
import { ShareProfile } from "./components/shareprofile";

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
