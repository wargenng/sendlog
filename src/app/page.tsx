import { SignedIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { RecentClimbs } from "./_components/climbs/recentclimbs";
import { DataCarousel } from "./_components/data/datacarousel";
import { RecentSessions } from "./sessions/_components/recentsessions";
import { Snapshot } from "./_components/data/snapshot/snapshot";
import { HomeSessions } from "./_components/sessions/homesessions";
export const dynamic = "force-dynamic";

export default function HomePage() {
    return (
        <main className="">
            <SignedIn>
                <div className="mt-16 space-y-4 pb-32">
                    <Suspense fallback={<div className="p-6">Loading...</div>}>
                        <Snapshot />
                        <HomeSessions />
                    </Suspense>
                </div>
            </SignedIn>
        </main>
    );
}
