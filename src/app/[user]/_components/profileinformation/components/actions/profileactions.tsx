import { clerkClient, User } from "@clerk/nextjs/server";
import { getIsUserProfile } from "~/app/api/climbActions";
import { getIsFriend } from "~/app/api/friendActions";
import { EditProfile } from "./components/editprofile";
import { AddFriend } from "./components/addfriend";
import { RemoveFriend } from "./components/removefriend";
import { ShareProfile } from "./components/shareprofile";

interface ProfileActionsProps {
    user: User;
}

export async function ProfileActions({ user }: ProfileActionsProps) {
    const isCurrectUser = await getIsUserProfile(user.id);
    const isFriends = await getIsFriend(user.id);

    return (
        <div className="flex gap-2">
            {isCurrectUser ? (
                <EditProfile />
            ) : isFriends ? (
                <RemoveFriend userId={user.id} />
            ) : (
                <AddFriend userId={user.id} />
            )}
            <ShareProfile username={user.username ?? ""} />
        </div>
    );
}
