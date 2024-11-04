import { SignedIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { Snapshot } from "./_components/data/snapshot/snapshot";
import { HomeSessions } from "./_components/sessions/homesessions";
export const dynamic = "force-dynamic";

export default function HomePage() {
    return (
        <main className="">
            <SignedIn>
                <div className="mt-16 space-y-2 pb-32">
                    <Suspense fallback={<div className="p-6">Loading...</div>}>
                        <Snapshot />
                        <HomeSessions />
                    </Suspense>
                </div>
            </SignedIn>
        </main>
    );
}
