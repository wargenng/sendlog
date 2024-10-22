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
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "~/components/ui/command";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

export async function SearchSheet() {
    const response = await clerkClient().users.getUserList();
    const users = response.data;

    return (
        <Sheet>
            <SheetTrigger>
                <Search />
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Search Users</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <Command>
                    <CommandInput placeholder="Search users..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem key={user.id}>
                                    <Link href={`/${user?.username}`}>
                                        {user.username}
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
