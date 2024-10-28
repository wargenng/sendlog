import { Suspense } from "react";
import { SessionCalendar } from "./_components/sessioncalendar";
export const dynamic = "force-dynamic";

export default function SessionsPage() {
    return (
        <main className="">
            <div className="mt-20 space-y-4 px-6 pb-32">
                <Suspense fallback={<div>Loading...</div>}>
                    <SessionCalendar />
                </Suspense>
            </div>
        </main>
    );
}
