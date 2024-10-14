"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
    return (
        <nav className="fixed z-10 flex w-full items-center justify-between border-b bg-background p-4 text-xl font-semibold">
            <div className="flex flex-row">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <div>sendlog</div>
        </nav>
    );
}
