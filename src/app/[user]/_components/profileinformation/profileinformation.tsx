import type { User } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { ProfileInformationClient } from "./profileinformationclient";

interface ProfileInformationProps {
    user: User;
}

export async function ProfileInformation({ user }: ProfileInformationProps) {
    return <ProfileInformationClient user={user} />;
}
