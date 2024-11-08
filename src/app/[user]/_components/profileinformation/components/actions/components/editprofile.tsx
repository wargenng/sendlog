"use client";

import { UserProfile } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

export function EditProfile() {
    const { signOut } = useClerk();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className="border-accent-2 text-accent-2 flex h-auto w-full gap-1 rounded-lg border py-1"
                    variant="none"
                >
                    <Edit size={14} />
                    <p>Edit</p>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <ScrollArea className="h-full pb-10">
                    <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className="flex h-dvh w-full flex-col items-center space-y-4 overflow-y-auto overflow-x-hidden pb-24">
                        <UserProfile />
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
