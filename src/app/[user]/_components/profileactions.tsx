import { getIsUserProfile } from "~/app/api/climbActions";
import { EditProfile } from "./editprofile";
import { Button } from "~/components/ui/button";
import { AddFriend } from "./addfriend";
import { getIsFriend } from "~/app/api/friendActions";
import { RemoveFriend } from "./removefriend";

interface ProfileActionsProps {
    userId: string;
}

export async function ProfileActions({ userId }: ProfileActionsProps) {
    const isCurrectUser = await getIsUserProfile(userId);
    const isFriends = await getIsFriend(userId);

    return (
        <div className="space-y-2">
            {isCurrectUser ? (
                <EditProfile />
            ) : isFriends ? (
                <RemoveFriend userId={userId} />
            ) : (
                <AddFriend userId={userId} />
            )}
            <Button variant="secondary" className="w-full">
                Share Profile
            </Button>
        </div>
    );
}
