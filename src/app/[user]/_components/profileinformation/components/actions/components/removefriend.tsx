"use client";

import { useRouter } from "next/navigation";
import { removeFriend } from "~/app/api/friendActions";
import { Button } from "~/components/ui/button";

interface FriendAmountProps {
    userId: string;
}
export function RemoveFriend({ userId }: FriendAmountProps) {
    const router = useRouter();
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await removeFriend(userId);
                router.refresh();
            }}
        >
            <Button
                variant="link"
                className="border-accent-2 text-accent-2 w-full rounded-lg border"
            >
                Unfollow
            </Button>
        </form>
    );
}
