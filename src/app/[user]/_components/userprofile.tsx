import { Suspense } from "react";
import { UserCharts } from "./charts/usercharts";
import { ProfileInformation } from "./profileinformation/profileinformation";
import { User } from "@clerk/nextjs/server";
import { ChartPie, MountainSnow, UsersRound } from "lucide-react";
import { ProfileContent } from "./profilecontent/profilecontent";

interface UserProfileProps {
    user: User;
}

export function UserProfile({ user }: UserProfileProps) {
    return (
        <div className="mt-16 pb-32">
            <Suspense fallback={<p className="px-6">Loading...</p>}>
                <ProfileInformation user={user} />
                <ProfileContent user={user} />
            </Suspense>
        </div>
    );
}
