import { clerkClient, User } from "@clerk/nextjs/server";
import { getIsUserProfile } from "~/app/api/climbActions";
import { getIsFriend } from "~/app/api/friendActions";
import { EditProfile } from "./components/editprofile/editprofile";
import { AddFriend } from "./components/addfriend";
import { RemoveFriend } from "./components/removefriend";
import { ShareProfile } from "./components/shareprofile";
import { FollowingDrawer } from "./components/followingdrawer";

interface ProfileActionsProps {
    user: User;
}

export async function ProfileActions({ user }: ProfileActionsProps) {
    const isCurrectUser = await getIsUserProfile(user.id);
    const isFriends = await getIsFriend(user.id);

    return (
        <div className="flex w-full gap-2">
            <div className="w-1/2">
                {isCurrectUser ? (
                    <EditProfile />
                ) : isFriends ? (
                    <FollowingDrawer
                        username={user.username ?? ""}
                        userId={user.id}
                    />
                ) : (
                    <AddFriend userId={user.id} />
                )}
            </div>
            <div className="w-1/2">
                <ShareProfile username={user.username ?? ""} />
            </div>
        </div>
    );
}
