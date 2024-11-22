"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "~/components/ui/scroll-area";
import { DrawerRight } from "~/components/drawer/drawerright";

interface UserData {
    id: string;
    username: string | null;
    fullname: string | null;
    image: string | null;
}

interface SearchDrawerClientProps {
    users: UserData[];
}

export default function SearchDrawerClient({ users }: SearchDrawerClientProps) {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const filteredUsers = users.filter((user) => {
        if (!inputValue || !user.username) return false;
        return user.username.toLowerCase().includes(inputValue.toLowerCase());
    });

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger>
                <Search size={22} />
            </DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <ScrollArea className="h-full pb-10">
                    <DrawerRight />
                    <DrawerHeader className="mt-2">
                        <DrawerTitle>Search Users</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <Command>
                        <CommandInput
                            placeholder="Search users..."
                            value={inputValue}
                            onValueChange={(value: string) =>
                                setInputValue(value)
                            }
                            className="text-base"
                        />
                        <CommandList>
                            {inputValue && filteredUsers.length === 0 && (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )}
                            {inputValue && filteredUsers.length > 0 && (
                                <CommandGroup heading="Users">
                                    {filteredUsers.map((user) => (
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
                            )}
                        </CommandList>
                    </Command>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
