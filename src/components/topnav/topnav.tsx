import { SignedIn } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { LogDrawer } from "../logdrawer/logdrawer";
import { SearchSheet } from "./components/searchsheet/searchsheet";

interface TopNavProps {
    title: string;
    users: User[];
}

export function TopNav({ title, users }: TopNavProps) {
    return (
        <nav className="fixed z-10 flex w-full items-center justify-between bg-background p-4">
            <div className="flex w-full flex-row">
                <div className="flex w-full items-center justify-between">
                    <div className="flex space-x-4">
                        <SignedIn>
                            <SearchSheet users={users} />
                        </SignedIn>
                    </div>
                    <div className="flex text-lg font-semibold">{title}</div>
                    <LogDrawer>
                        <Plus size={24} className="cursor-pointer" />
                    </LogDrawer>
                </div>
            </div>
        </nav>
    );
}
