"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function TopNav() {
    return (
        <nav className="fixed z-10 flex w-full items-center justify-between border-b bg-background p-4">
            <div className="flex w-full flex-row">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex w-1/3 flex-1 justify-start">
                            <UserButton />
                        </div>
                        <div className="flex w-1/3 flex-1 justify-center text-2xl font-semibold">
                            sendlog
                        </div>
                        <div className="flex w-1/3 flex-1 justify-end">
                            <Link
                                href="/friends"
                                className={`flex flex-col items-center`}
                            >
                                <FriendsIcon />
                            </Link>
                        </div>
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}

const FriendsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0 17v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5m6-17a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0 17v-4h-2l2-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1l2 6h-2v4"
        />
    </svg>
);
