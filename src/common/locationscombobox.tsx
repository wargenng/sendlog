import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import { locations } from "../app/utils/locations";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "~/components/ui/dropdown-menu";

interface LocationsComboboxProps {
    location: number;
    setLocation: (location: number) => void;
}

export function LocationsCombobox({
    location,
    setLocation,
}: LocationsComboboxProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
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
                            maxWidth: "calc(100% - 24px)",
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
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100dvw-2rem)] overflow-y-auto">
                <Command>
                    <CommandInput
                        placeholder="Search location..."
                        className="text-base"
                    />
                    <CommandList className="w-full">
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup className="w-full">
                            {locations.map((g) => (
                                <CommandItem
                                    key={g.id}
                                    value={g.label}
                                    onSelect={() => {
                                        setLocation(
                                            g.id === location ? -1 : g.id,
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
