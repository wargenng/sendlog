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
                className="w-full rounded-lg border border-accent text-accent"
            >
                Unfollow
            </Button>
        </form>
    );
}