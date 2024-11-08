import type { User } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { ProfileContent } from "./profilecontent/profilecontent";
import { ProfileInformation } from "./profileinformation/profileinformation";

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
