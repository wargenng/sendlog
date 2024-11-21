import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import BulkLogDrawer from "~/components/bulklogdrawer/bulklogdrawer";
import { HomeButton } from "./homebutton";
import { UserButton } from "./userbutton";

export function BottomNav() {
    return (
        <nav className="fixed bottom-0 flex w-full items-center justify-center bg-background p-4 text-xl font-semibold">
            <div className="flex w-full flex-row items-center space-x-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <div className="flex h-16 w-full justify-around gap-2">
                        <HomeButton />
                        <BulkLogDrawer>
                            <div
                                className={`flex h-full w-1/3 flex-col items-center space-y-1`}
                            >
                                <div className="flex items-center justify-center">
                                    <PlusCircle size={28} />
                                </div>
                                <span className="text-xs font-normal">
                                    Log Activity
                                </span>
                            </div>
                        </BulkLogDrawer>
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}
