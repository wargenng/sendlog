"use client";

import { addFriend } from "~/app/api/friendActions";
import { Button } from "~/components/ui/button";

interface FriendAmountProps {
    userId: string;
}
export function AddFriend({ userId }: FriendAmountProps) {
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await addFriend(userId);
            }}
        >
            <Button className="w-full text-foreground">Add Friend</Button>
        </form>
    );
}
