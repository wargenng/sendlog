import type { User } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { ProfileContent } from "./profilecontent/profilecontent";
import { ProfileInformation } from "./profileinformation/profileinformation";
import { TopNav } from "~/app/_components/topnav/topnav";

interface UserProfileProps {
    user: User;
}

export function UserProfile({ user }: UserProfileProps) {
    return (
        <main className="">
            <TopNav title={user?.username ?? "404"} />

            <div className="mt-16 pb-32">
                <Suspense fallback={<p className="px-6">Loading...</p>}>
                    <ProfileInformation user={user} />
                    <ProfileContent user={user} />
                </Suspense>
            </div>
        </main>
    );
}
