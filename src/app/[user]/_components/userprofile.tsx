import type { User } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { ProfileContent } from "./profilecontent/profilecontent";
import { ProfileInformation } from "./profileinformation/profileinformation";
import { TopNav } from "~/app/_components/topnav/topnav";

interface UserProfileProps {
    user: User;
    users: User[];
}

export function UserProfile({ user, users }: UserProfileProps) {
    return (
        <main className="">
            <TopNav title={user?.username ?? "404"} users={users} />

            <div className="mt-16 pb-32">
                <Suspense fallback={<p className="px-6">Loading...</p>}>
                    <ProfileInformation user={user} users={users} />
                    <ProfileContent user={user} users={users} />
                </Suspense>
            </div>
        </main>
    );
}
