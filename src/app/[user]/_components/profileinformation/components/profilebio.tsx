"use client";

import { useUser } from "@clerk/nextjs";

export function ProfileBio() {
    const { user } = useUser();
    if (!user || !user.unsafeMetadata.bio) return;

    return (
        <div className="w-full text-sm font-light">
            {user.unsafeMetadata.bio as String}
        </div>
    );
}
