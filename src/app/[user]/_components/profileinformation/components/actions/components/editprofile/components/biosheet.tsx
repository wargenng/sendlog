"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { ProfileButton } from "./profilebutton";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

export function BioSheet() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    if (!user) {
        return null;
    }
    const [bio, setBio] = useState((user.unsafeMetadata?.bio as string) ?? "");

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="w-full">
                <ProfileButton
                    type="Bio"
                    value={(user.unsafeMetadata?.bio as string) ?? ""}
                />
            </SheetTrigger>
            <SheetContent className="w-full space-y-2">
                <SheetHeader>
                    <SheetTitle className="text-base">Bio</SheetTitle>
                    <SheetDescription></SheetDescription>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            try {
                                user.update({
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
                            className="text-accent-2 fixed right-2 top-4 font-bold"
                        >
                            Done
                        </Button>
                    </form>
                </SheetHeader>
                <Textarea
                    className="h-60 w-full"
                    value={bio}
                    onChange={(e) => {
                        if (e.target.value.length <= 255) {
                            setBio(e.target.value);
                        }
                    }}
                />

                <SheetFooter className="flex w-full items-end">
                    {255 - bio.length}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
