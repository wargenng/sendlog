import type { User } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { ProfileInformationClient } from "./profileinformationclient";

interface ProfileInformationProps {
    username: string;
}

export async function ProfileInformation({
    username,
}: ProfileInformationProps) {
    const response = await clerkClient().users.getUserList();
    const users = response.data;
    const user = users.find((user: User) => user.username === username);
    if (!user) {
        return <p>User not found</p>;
    }

    return <ProfileInformationClient user={user} />;
}
