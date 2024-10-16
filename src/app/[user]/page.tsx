import { clerkClient } from "@clerk/express";

export async function generateStaticParams() {
    // Fetch all users
    const response = await clerkClient.users.getUserList();
    const users = response.data;

    return users.map((user) => ({
        username: user.username,
    }));
}

interface Params {
    params: {
        user: string;
    };
}

export default async function UserPage({ params }: Params) {
    const { user: username } = params;
    const response = await clerkClient.users.getUserList();
    const users = response.data;
    const user = users.find((user) => user.username === username);

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <div>
            <h1>
                Welcome, {user.firstName} {user.lastName}!
            </h1>
            <p>Username: {user.username}</p>
        </div>
    );
}
