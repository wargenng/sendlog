import { clerkClient } from "@clerk/nextjs/server";
import { getProfileFriends } from "~/app/api/friendActions";
import { FriendsAmountClient } from "./friendsamountclient";

interface FriendAmountProps {
    userId: string;
}

interface UserData {
    id: string;
    username: string | null;
    fullname: string | null;
    image: string | null;
}

export async function FriendAmount({ userId }: FriendAmountProps) {
    const friends = (await getProfileFriends(userId)) as UserData[];

    if (!friends) {
        return (
            <div className="w-12">
                <p className="text-xs text-foreground/50">Following</p>
                <p className="text-base brightness-50">0</p>
            </div>
        );
    }

    const response = await clerkClient().users.getUserList();
    const username =
        response.data.find((user) => user.id === userId)?.username ?? "";

    return (
        <FriendsAmountClient
            friends={friends}
            username={username}
            isFollowing={true}
        />
    );
}
