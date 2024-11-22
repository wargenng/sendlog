"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { DrawerRight } from "~/components/drawer/drawerright";

export function FirstNameDrawer() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user!.firstName ?? "");

    if (!user) {
        return null;
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger className="w-full">
                <ProfileButton type="First Name" value={user.firstName ?? ""} />
            </DrawerTrigger>
            <DrawerContent className="h-full space-y-2 px-4">
                <DrawerRight />
                <DrawerHeader className="mt-2">
                    <DrawerTitle className="text-base">First Name</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                console.log(name);
                                await user.update({
                                    firstName: name,
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

                <DrawerFooter className="flex w-full items-end">
                    {name.length}/{25}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
