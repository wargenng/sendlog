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

interface UserData {
    id: string;
    username: string | null;
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
                    />
                    <CommandList>
                        {inputValue && filteredUsers.length === 0 && (
                            <CommandEmpty>No results found.</CommandEmpty>
                        )}
                        {inputValue && filteredUsers.length > 0 && (
                            <CommandGroup>
                                {filteredUsers.map((user) => (
                                    <CommandItem key={user.id}>
                                        <Link
                                            href={`/${user.username}`}
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            {user.username}
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
