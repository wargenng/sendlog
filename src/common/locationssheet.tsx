"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
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
import { cn } from "~/lib/utils";
import { locations } from "../app/utils/locations";

interface LocationsSheetProps {
    location: number;
    setLocation: (location: number) => void;
}

export function LocationsSheet({ location, setLocation }: LocationsSheetProps) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    <span
                        className="truncate"
                        style={{
                            display: "inline-block",
                            maxWidth: "calc(100% - 20px)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {location
                            ? locations.find((g) => g.id === location)?.label
                            : "Select location..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Search Location</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <Command>
                    <CommandInput
                        placeholder="Search location..."
                        className="text-base"
                    />
                    <CommandList className="h-full max-h-full w-full">
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup className="w-full">
                            {locations.map((g) => (
                                <CommandItem
                                    key={g.id}
                                    value={g.label}
                                    onSelect={() => {
                                        setLocation(
                                            g.id === location ? 0 : g.id,
                                        );
                                        setOpen(false);
                                    }}
                                    className="flex justify-between"
                                >
                                    <div className="flex">
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                location === g.id
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                        {g.label}
                                    </div>
                                    <div className="text-xs text-foreground/50">
                                        {g.location}, {g.state}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </SheetContent>
        </Sheet>
    );
}
