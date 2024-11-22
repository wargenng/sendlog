"use client";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { ProfileButton } from "./profilebutton";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { DrawerRight } from "~/components/drawer/drawerright";

export function BioDrawer() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [bio, setBio] = useState((user?.unsafeMetadata?.bio as string) ?? "");
    if (!user) {
        return null;
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger className="w-full">
                <ProfileButton
                    type="Bio"
                    value={(user.unsafeMetadata?.bio as string) ?? ""}
                />
            </DrawerTrigger>
            <DrawerContent className="h-full space-y-2 px-4">
                <DrawerRight />
                <DrawerHeader className="mt-2">
                    <DrawerTitle className="text-base">Bio</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                await user.update({
                                    unsafeMetadata: {
                                        bio,
                                    },
                                });
                            } catch (e) {
                                console.error(e);
                            }
                            setOpen(false);
                        }}
                    >
                        <Button
                            variant="none"
                            className="fixed right-2 top-4 font-bold text-accent-2"
                        >
                            Done
                        </Button>
                    </form>
                </DrawerHeader>
                <Textarea
                    className="h-60 w-full"
                    value={bio}
                    onChange={(e) => {
                        if (e.target.value.length <= 255) {
                            setBio(e.target.value);
                        }
                    }}
                />

                <DrawerFooter className="flex w-full items-end">
                    {bio.length}/{255}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
