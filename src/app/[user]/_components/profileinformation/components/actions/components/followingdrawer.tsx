"use client";

import { User } from "@clerk/nextjs/server";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeFriend } from "~/app/api/friendActions";
import { Button } from "~/components/ui/button";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";

interface FollowingDrawerProps {
    username: string;
    userId: string;
}

export function FollowingDrawer({ username, userId }: FollowingDrawerProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant="none"
                    className="border-accent-2 text-accent-2 flex w-full items-center justify-center gap-1 rounded-lg border"
                >
                    <h1>Following</h1>
                    <ChevronDown size={20} />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{username}</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="w-full p-4">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setOpen(false);
                            await removeFriend(userId);
                            router.refresh();
                        }}
                    >
                        <Button variant="none" className="text-red-500">
                            Unfollow
                        </Button>
                    </form>
                </div>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
