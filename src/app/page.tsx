import { SignedIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { Snapshot } from "../components/snapshot/snapshot";
import { HomeSessions } from "../components/sessions/homesessions";
import { TopNav } from "../components/topnav/topnav";
import { clerkClient } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

export default async function HomePage() {
    const response = await clerkClient().users.getUserList();
    const users = response.data;

    return (
        <main className="">
            <SignedIn>
                <TopNav title="Home" users={users} />
                <div className="mt-16 space-y-2 pb-32">
                    <Suspense fallback={<div className="px-6">Loading...</div>}>
                        <Snapshot />
                        <HomeSessions users={users} />
                    </Suspense>
                </div>
            </SignedIn>
        </main>
    );
}
