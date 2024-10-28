import { SignedIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { RecentClimbs } from "./_components/climbs/recentclimbs";
import { DataCarousel } from "./_components/data/datacarousel";
export const dynamic = "force-dynamic";

export default function HomePage() {
    return (
        <main className="">
            <SignedIn>
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
