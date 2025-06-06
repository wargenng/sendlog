import type { User } from "@clerk/nextjs/server";
import { getProfileFriends } from "~/app/api/friendActions";
import { FriendsAmountClient } from "./friendsamountclient";

interface FriendAmountProps {
    user: User;
    users: User[];
}

interface UserData {
    id: string;
    username: string | null;
    fullname: string | null;
    image: string | null;
}

export async function FriendAmount({ user, users }: FriendAmountProps) {
    const friends = (await getProfileFriends(user.id, users)) as UserData[];

    if (!friends || friends.length === 0) {
        return (
            <div className="w-12 space-y-1">
                <p className="text-xs text-foreground/50">Following</p>
                <p className="text-lg brightness-50">0</p>
            </div>
        );
    }

    return (
        <FriendsAmountClient
            friends={friends}
            username={user.username ?? ""}
            isFollowing={true}
        />
    );
}
