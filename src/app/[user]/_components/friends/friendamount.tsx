import { getProfileFriends } from "~/app/api/friendActions";
import { FriendsAmountClient } from "./friendsamountclient";
import { clerkClient, User } from "@clerk/nextjs/server";

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
            <div className="w-12 text-center">
                <p className="text-base brightness-50">0</p>
                <p className="text-xs text-foreground/50">friends</p>
            </div>
        );
    }

    const response = await clerkClient().users.getUserList();
    const username =
        response.data.find((user) => user.id === userId)?.username || "";

    return <FriendsAmountClient friends={friends} username={username} />;
}
