import { SignedIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { Snapshot } from "./_components/data/snapshot/snapshot";
import { HomeSessions } from "./_components/sessions/homesessions";
import { TopNav } from "./_components/topnav/topnav";
export const dynamic = "force-dynamic";

export default function HomePage() {
    return (
        <main className="">
            <SignedIn>
                <TopNav title="Home" />
                <div className="mt-16 space-y-2 pb-32">
                    <Suspense fallback={<div className="px-6">Loading...</div>}>
                        <Snapshot />
                        <HomeSessions />
                    </Suspense>
                </div>
            </SignedIn>
        </main>
    );
}
