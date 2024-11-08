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
            <Button
                className="border-accent-2 text-accent-2 w-full rounded-lg border"
                variant="none"
            >
                Follow
            </Button>
        </form>
    );
}
