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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

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
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="w-12 space-y-1">
                    <p className="text-xs text-foreground/50">
                        {isFollowing ? "Following" : "Followers"}
                    </p>
                    <p className="text-lg">{friends.length}</p>
                </div>
            </SheetTrigger>
            <SheetContent className="w-full">
                <ScrollArea className="h-full pb-10">
                    <SheetHeader>
                        <SheetTitle>{username}</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
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
            </SheetContent>
        </Sheet>
    );
}
