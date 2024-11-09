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
import { Input } from "~/components/ui/input";

export function LastNameSheet() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    if (!user) {
        return null;
    }
    const [name, setName] = useState((user.lastName as string) ?? "");

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
                        onSubmit={(e) => {
                            e.preventDefault();
                            try {
                                console.log(name);
                                user.update({
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
                            className="text-accent-2 fixed right-2 top-4 font-bold"
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
