"use client";

import { UserProfile, useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { ProfileButton } from "./components/profilebutton";
import { BioDrawer } from "./components/biodrawer";
import { FirstNameDrawer } from "./components/firstnamedrawer";
import { LastNameDrawer } from "./components/lastnamedrawer";
import { useRouter } from "next/navigation";
import { DrawerRight } from "~/components/drawer/drawerright";

export function EditProfile() {
    const router = useRouter();
    const { signOut } = useClerk();
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <Drawer
            onOpenChange={(open) => {
                if (!open) {
                    router.refresh();
                }
            }}
            direction="right"
        >
            <DrawerTrigger asChild>
                <Button
                    className="flex h-auto w-full gap-1 rounded-lg border border-accent-2 py-1 text-accent-2"
                    variant="none"
                >
                    <Edit size={14} />
                    <p>Edit</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <DrawerRight />
                <DrawerHeader className="mt-2">
                    <DrawerTitle>Edit Profile</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="mt-4 flex h-dvh w-full flex-col items-center space-y-6 overflow-y-auto overflow-x-hidden">
                    <FirstNameDrawer />
                    <LastNameDrawer />
                    <ProfileButton
                        type="Username"
                        value={user.username ?? ""}
                    />
                    <BioDrawer />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
