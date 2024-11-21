import { SignedIn, UserButton } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { getIsUserProfile } from "~/app/api/climbActions";
import BulkLogDrawer from "~/components/bulklogdrawer/bulklogdrawer";
import { Skeleton } from "~/components/ui/skeleton";
import { SearchSheet } from "./components/searchsheet";

interface TopNavProps {
    title: string;
    users: User[];
    user: User;
}

export async function TopNav({ title, users, user }: TopNavProps) {
    const isCurrectUser = await getIsUserProfile(user.id);

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
                    <SignedIn>
                        {isCurrectUser ? (
                            <div className="flex h-7 w-7 items-center justify-center">
                                <Skeleton className="absolute h-[1.75rem] w-[1.75rem] rounded-full" />
                                <UserButton />
                            </div>
                        ) : (
                            <BulkLogDrawer>
                                <Plus size={24} className="cursor-pointer" />
                            </BulkLogDrawer>
                        )}
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
