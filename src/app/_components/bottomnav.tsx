"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ClimbDrawer } from "./climbdrawer";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 flex w-full items-center justify-center border-t p-4 text-xl font-semibold">
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ClimbDrawer />
        </SignedIn>
      </div>
    </nav>
  );
}
