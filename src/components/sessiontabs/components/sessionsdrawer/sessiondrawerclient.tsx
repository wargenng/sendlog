import type { Session } from "~/server/db/schema";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DrawerRight } from "../../../drawer/drawerright";

interface SessionDrawerClientProps {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    sessions: Session[];
}

export function SessionDrawerClient({
    sessionId,
    setSessionId,
    sessions,
}: SessionDrawerClientProps) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger asChild>
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
                        {sessionId
                            ? sessions.find(
                                  (g) => g.id.toString() === sessionId,
                              )?.name
                            : "Select session..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <DrawerRight />
                <DrawerHeader>
                    <DrawerTitle>Search Session</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <Command>
                    <CommandInput
                        placeholder="Search session..."
                        className="text-base"
                    />
                    <CommandList className="h-full max-h-full w-full">
                        <CommandEmpty>No session found.</CommandEmpty>
                        <CommandGroup className="w-full">
                            {sessions.map((g) => (
                                <CommandItem
                                    key={g.id}
                                    value={g.id.toString()}
                                    onSelect={() => {
                                        setSessionId(
                                            g.id.toString() === sessionId
                                                ? ""
                                                : g.id.toString(),
                                        );
                                        setOpen(false);
                                    }}
                                    className="flex justify-between"
                                >
                                    <div className="flex">
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                sessionId === g.id.toString()
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                        {g.name}
                                    </div>
                                    <div className="text-xs text-foreground/50">
                                        {g.date.toLocaleDateString()}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DrawerContent>
        </Drawer>
    );
}
