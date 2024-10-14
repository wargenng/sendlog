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
import { locations } from "../utils/locations";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "~/components/ui/dropdown-menu";

export function LocationsCombobox({
    location,
    setLocation,
}: {
    location: number;
    setLocation: (location: number) => void;
}) {
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
            <DropdownMenuContent className="overflow-y-auto">
                <Command>
                    <CommandInput
                        placeholder="Search location..."
                        className="text-base"
                    />
                    <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                            {locations.map((g) => (
                                <CommandItem
                                    key={g.id}
                                    value={g.id.toString()}
                                    onSelect={(currentValue) => {
                                        const selectedValue = parseInt(
                                            currentValue,
                                            10,
                                        );
                                        setLocation(
                                            selectedValue === location
                                                ? -1
                                                : selectedValue,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            location === g.id
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {g.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
