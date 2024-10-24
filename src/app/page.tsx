import { SignedIn } from "@clerk/nextjs";
import { DataCarousel } from "./_components/data/datacarousel";
import { RecentClimbs } from "./_components/climbs/recentclimbs";
import { TopNav } from "./_components/topnav";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function HomePage() {
    return (
        <main className="">
            <SignedIn>
                <TopNav title="sendlog" />
                <div className="mt-20 space-y-4 pb-32">
                    <Suspense fallback={<div className="p-6">Loading...</div>}>
                        <div className="space-y-2">
                            <DataCarousel />
                        </div>
                        <div className="p-6">
                            <RecentClimbs />
                        </div>
                    </Suspense>
                </div>
            </SignedIn>
        </main>
    );
}
