import { Suspense } from "react";
import { UserCharts } from "./charts/usercharts";
import { ProfileInformation } from "./profileinformation/profileinformation";

interface UserProfileProps {
    username: string;
}

export function UserProfile({ username }: UserProfileProps) {
    return (
        <div className="mt-16 space-y-2 pb-32">
            <Suspense fallback={<p className="px-6">Loading...</p>}>
                <ProfileInformation username={username} />
                <UserCharts username={username} />
            </Suspense>
        </div>
    );
}
