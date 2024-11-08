import { Suspense } from "react";
import { ClimbCalendar } from "../_components/climbs/climbcalendar";
export const dynamic = "force-dynamic";

export default function ClimbsPage() {
    return (
        <main className="">
            {/* <div className="mt-20 space-y-4 px-6 pb-32">
                <Suspense fallback={<div>Loading...</div>}>
                    <ClimbCalendar />
                </Suspense>
            </div> */}
        </main>
    );
}
