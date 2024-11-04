"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Home, Plus, PlusCircle } from "lucide-react";
import LogDrawer from "~/common/logdrawer/logdrawer";

export function BottomNav() {
    const currentPath = usePathname();
    const { user } = useUser();

    return (
        <nav className="fixed bottom-0 flex w-full items-center justify-center bg-background p-4 text-xl font-semibold">
            <div className="flex w-full flex-row items-center space-x-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <div className="flex w-full justify-around gap-2 pb-4">
                        <Link
                            href="/"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/" ? "text-accent" : "text-foreground"}`}
                        >
                            <div className="flex items-center justify-center">
                                <Home size={28} />
                            </div>
                            <span className="text-xs font-normal">Home</span>
                        </Link>
                        <LogDrawer>
                            <div
                                className={`flex w-1/5 flex-col items-center space-y-1`}
                            >
                                <div className="flex items-center justify-center">
                                    <PlusCircle size={28} />
                                </div>
                                <span className="text-xs font-normal">
                                    Log Activity
                                </span>
                            </div>
                        </LogDrawer>
                        <Link
                            href={`/${user?.username}`}
                            className={`flex w-1/5 flex-col items-center space-y-1.5 ${currentPath === `/${user?.username}` ? "text-accent" : "text-foreground"}`}
                        >
                            <div className="flex h-7 w-7 items-center justify-center">
                                {user?.imageUrl ? (
                                    <Image
                                        src={user.imageUrl}
                                        className={`h-7 w-7 rounded-full border-2 object-cover ${currentPath === `/${user?.username}` ? "border-accent" : "border-foreground"}`}
                                        alt="Profile"
                                        width={28}
                                        height={28}
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1.75rem"
                                        height="1.75rem"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M8 14.5a6.47 6.47 0 0 0 3.25-.87V11.5A2.25 2.25 0 0 0 9 9.25H7a2.25 2.25 0 0 0-2.25 2.25v2.13A6.47 6.47 0 0 0 8 14.5m4.75-3v.937a6.5 6.5 0 1 0-9.5 0V11.5a3.75 3.75 0 0 1 2.486-3.532a3 3 0 1 1 4.528 0A3.75 3.75 0 0 1 12.75 11.5M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M9.5 6a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs font-normal">Profile</span>
                        </Link>
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}
