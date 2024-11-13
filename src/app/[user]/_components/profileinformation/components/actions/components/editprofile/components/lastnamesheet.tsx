"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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

export function LastNameSheet() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user?.lastName ?? "");

    if (!user) {
        return null;
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="w-full">
                <ProfileButton type="Last Name" value={user.lastName ?? ""} />
            </SheetTrigger>
            <SheetContent className="w-full space-y-2">
                <SheetHeader>
                    <SheetTitle className="text-base">Last Name</SheetTitle>
                    <SheetDescription></SheetDescription>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                console.log(name);
                                await user.update({
                                    lastName: name,
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
                </SheetHeader>
                <Input
                    className="w-full"
                    value={name}
                    onChange={(e) => {
                        if (e.target.value.length <= 25) {
                            setName(e.target.value);
                        }
                    }}
                    autoFocus
                />

                <SheetFooter className="flex w-full items-end">
                    {25 - name.length}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
