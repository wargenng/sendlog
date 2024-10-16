import { SignedIn, SignedOut } from "@clerk/nextjs";
import { DataCarousel } from "./_components/datacarousel";
import { RecentClimbs } from "./_components/recentclimbs";
import { TopNav } from "./_components/topnav";
import { Suspense } from "react";
import Loading from "./loading";
export const dynamic = "force-dynamic";

export default async function HomePage() {
    return (
        <main className="">
            <SignedIn>
                <TopNav title="sendlog" />
                <Suspense fallback={<Loading />}>
                    <div className="mt-20 space-y-4 pb-32">
                        <div className="space-y-2">
                            <p className="px-6 text-2xl font-semibold">
                                welcome back!
                            </p>
                            <DataCarousel />
                        </div>
                        <RecentClimbs />
                    </div>
                </Suspense>
            </SignedIn>
        </main>
    );
}
