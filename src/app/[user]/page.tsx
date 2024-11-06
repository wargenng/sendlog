import { clerkClient, User } from "@clerk/nextjs/server";
import { UserProfile } from "./_components/userprofile";

export const dynamic = "force-dynamic";

interface Params {
    params: {
        user: string;
    };
}

export default async function UserPage({ params }: Params) {
    const { user: username } = params;
    const response = await clerkClient().users.getUserList();
    const users = response.data;
    const user = users.find((user: User) => user.username === username);
    if (!user) {
        return <p>User not found</p>;
    }

    return <UserProfile user={user} />;
}
