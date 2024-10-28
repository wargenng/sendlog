"use client";

import { UserProfile } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
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
            </SheetContent>
        </Sheet>
    );
}
