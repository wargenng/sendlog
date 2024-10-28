import { Suspense } from "react";
import { SessionCalendar } from "./_components/sessioncalendar";
import { RecentSessions } from "./_components/recentsessions";
export const dynamic = "force-dynamic";

export default function SessionsPage() {
    return (
        <main className="">
            <div className="mt-20 space-y-4 px-6 pb-32">
                <Suspense fallback={<div>Loading...</div>}>
                    <RecentSessions />
                </Suspense>
            </div>
        </main>
    );
}
