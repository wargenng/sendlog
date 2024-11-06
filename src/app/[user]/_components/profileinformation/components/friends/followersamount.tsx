import { User } from "@clerk/nextjs/server";
import { getProfileFollowers } from "~/app/api/friendActions";
import { FriendsAmountClient } from "./friendsamountclient";

interface FriendAmountProps {
    user: User;
}

interface UserData {
    id: string;
    username: string | null;
    fullname: string | null;
    image: string | null;
}

export async function FollowerAmount({ user }: FriendAmountProps) {
    const friends = (await getProfileFollowers(user.id)) as UserData[];

    if (!friends) {
        return (
            <div className="w-12">
                <p className="text-xs text-foreground/50">Followers</p>
                <p className="text-base brightness-50">0</p>
            </div>
        );
    }

    return (
        <FriendsAmountClient
            friends={friends}
            username={user.username ?? ""}
            isFollowing={false}
        />
    );
}
