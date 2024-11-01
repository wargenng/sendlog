"use client";

import { UserProfile } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
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
                <Button className="w-full">Edit Profile</Button>
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
