"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

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

interface UserData {
    id: string;
    username: string | null;
    fullname: string | null;
    image: string | null;
}

interface SearchSheetClientProps {
    users: UserData[];
}

export default function SearchSheetClient({ users }: SearchSheetClientProps) {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const filteredUsers = users.filter((user) => {
        if (!inputValue || !user.username) return false;
        return user.username.toLowerCase().includes(inputValue.toLowerCase());
    });

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Search />
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Search Users</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <Command>
                    <CommandInput
                        placeholder="Search users..."
                        value={inputValue}
                        onValueChange={(value: string) => setInputValue(value)}
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
                                                        user.image ||
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
            </SheetContent>
        </Sheet>
    );
}
