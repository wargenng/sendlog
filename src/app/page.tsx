import { SignedIn, SignedOut } from "@clerk/nextjs";
import { DataCarousel } from "./_components/datacarousel";
import { RecentClimbs } from "./_components/recentclimbs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
    return (
        <main className="mt-20 pb-32">
            <SignedOut>
                <div className="h-full w-full text-2xl">please sign in</div>
            </SignedOut>
            <SignedIn>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="px-6 text-2xl font-semibold">
                            welcome back!
                        </p>
                        <DataCarousel />
                    </div>
                    <RecentClimbs />
                </div>
            </SignedIn>
        </main>
    );
}
