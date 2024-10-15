"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface TopNavProps {
    title: string;
}

export function TopNav({ title }: TopNavProps) {
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
                            {title}
                        </div>
                        <div className="flex w-1/3 flex-1 justify-end">
                            <Link
                                href="/notifications"
                                className={`flex flex-col items-center`}
                            >
                                <NotificationsIcon />
                            </Link>
                        </div>
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}

const NotificationsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 1a1 1 0 0 0-1 1v.1A5 5 0 0 0 3 7v4l-1.205 1.328c-.583.643-.127 1.672.74 1.672h3.733a2 2 0 0 0 3.464 0h3.733c.867 0 1.323-1.03.74-1.672L13 11V7a5 5 0 0 0-4-4.9V2a1 1 0 0 0-1-1M4.5 11.58l-.39.428l-.446.492h8.672l-.447-.492l-.389-.429V7a3.5 3.5 0 1 0-7 0z"
            clipRule="evenodd"
        />
    </svg>
);
