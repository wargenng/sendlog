import { Suspense } from "react";
import { TopNav } from "../_components/topnav";
import { RecentSessions } from "./_components/recentsessions";

export default async function SessionsPage() {
    return (
        <main className="">
            <TopNav title="sessions" />
            <div className="mt-20 space-y-4 px-6 pb-32">
                <div className="space-y-2">
                    <h1 className="text-base font-bold">recent sessions</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RecentSessions />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
