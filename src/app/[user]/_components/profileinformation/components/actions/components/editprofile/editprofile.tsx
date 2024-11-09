"use client";

import { UserProfile, useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { ProfileButton } from "./components/profilebutton";
import { BioSheet } from "./components/biosheet";
import { FirstNameSheet } from "./components/firstnamesheet";
import { LastNameSheet } from "./components/lastnamesheet";
import { useRouter } from "next/navigation";

export function EditProfile() {
    const router = useRouter();
    const { signOut } = useClerk();
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <Sheet
            onOpenChange={(open) => {
                if (!open) {
                    router.refresh();
                }
            }}
        >
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
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="mt-4 flex h-dvh w-full flex-col items-center space-y-6 overflow-y-auto overflow-x-hidden">
                    <FirstNameSheet />
                    <LastNameSheet />
                    <ProfileButton
                        type="Username"
                        value={user.username ?? ""}
                    />
                    <BioSheet />
                </div>
            </SheetContent>
        </Sheet>
    );
}
