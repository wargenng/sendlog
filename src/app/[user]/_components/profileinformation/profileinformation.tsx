import type { User } from "@clerk/nextjs/server";
import { ProfileInformationClient } from "./profileinformationclient";

interface ProfileInformationProps {
    user: User;
    users: User[];
}

export async function ProfileInformation({
    user,
    users,
}: ProfileInformationProps) {
    return <ProfileInformationClient user={user} users={users} />;
}
