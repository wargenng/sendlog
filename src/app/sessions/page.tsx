import { Suspense } from "react";
import { TopNav } from "../_components/topnav";
import { SessionCalendar } from "./_components/sessioncalendar";
import { getCurrentUsersClimbs } from "~/server/queries";
export const dynamic = "force-dynamic";

export default function SessionsPage() {
    return (
        <main className="">
            <TopNav title="sessions" />
            <div className="mt-20 space-y-4 px-6 pb-32">
                <Suspense fallback={<div>Loading...</div>}>
                    <SessionCalendar />
                </Suspense>
            </div>
        </main>
    );
}
