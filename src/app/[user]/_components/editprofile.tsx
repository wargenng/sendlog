"use client";

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
                <Button className="w-full text-foreground">Edit Profile</Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="space-y-2">
                    <Button variant="secondary" className="w-full">
                        Change Profile Picture
                    </Button>
                    <Button variant="secondary" className="w-full">
                        Change Username
                    </Button>
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
