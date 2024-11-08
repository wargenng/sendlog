"use client";

import { useRouter } from "next/navigation";
import { addFriend } from "~/app/api/friendActions";
import { Button } from "~/components/ui/button";

interface FriendAmountProps {
    userId: string;
}
export function AddFriend({ userId }: FriendAmountProps) {
    const router = useRouter();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await addFriend(userId);
                router.refresh();
            }}
        >
            <Button className="bg-accent-2 w-full rounded-lg" variant="none">
                Follow
            </Button>
        </form>
    );
}
