"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { DrawerRight } from "~/components/drawer/drawerright";

interface FriendsAmountClientProps {
    friends: UserData[];
    username: string;
    isFollowing: boolean;
}

interface UserData {
    id: string;
    username: string | null;
    fullname: string | null;
    image: string | null;
}

export function FriendsAmountClient({
    friends,
    username,
    isFollowing,
}: FriendsAmountClientProps) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger asChild>
                <div className="w-12 space-y-1">
                    <p className="text-xs text-foreground/50">
                        {isFollowing ? "Following" : "Followers"}
                    </p>
                    <p className="text-lg">{friends.length}</p>
                </div>
            </DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <ScrollArea className="h-full pb-10">
                    <DrawerRight />
                    <DrawerHeader className="mt-2">
                        <DrawerTitle>{username}</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <Command>
                        <CommandInput placeholder="Search" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {friends.map((user) => (
                                    <CommandItem key={user.id}>
                                        <Link
                                            href={`/${user.username}`}
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    className="h-12 w-12 rounded-full object-cover"
                                                    src={
                                                        user.image ??
                                                        "/user.png"
                                                    }
                                                    alt="user image"
                                                    width={40}
                                                    height={40}
                                                />
                                                <div>
                                                    <h1>{user.fullname}</h1>
                                                    <h1 className="text-foreground/50">
                                                        @{user.username}
                                                    </h1>
                                                </div>
                                            </div>
                                        </Link>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
