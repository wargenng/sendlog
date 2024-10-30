import { getProfileFriends } from "~/app/api/friendActions";

interface FriendAmountProps {
    userId: string;
}

export async function FriendAmount({ userId }: FriendAmountProps) {
    const friends = await getProfileFriends(userId);

    return (
        <div className="w-12 text-center">
            <p className="text-base">{friends.length}</p>
            <p className="text-xs text-foreground/50">friends</p>
        </div>
    );
}
