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
}: FriendsAmountClientProps) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <div className="w-12 text-center">
                    <p className="text-base">{friends.length}</p>
                    <p className="text-xs text-foreground/50">friends</p>
                </div>
            </SheetTrigger>
            <SheetContent className="w-full">
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
                                                src={user.image || "/user.png"}
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
            </SheetContent>
        </Sheet>
    );
}