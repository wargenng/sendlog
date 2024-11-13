"use client";

interface ProfileBioProps {
    bio: string;
}

export function ProfileBio({ bio }: ProfileBioProps) {
    return <div className="w-full text-sm font-light">{bio}</div>;
}
