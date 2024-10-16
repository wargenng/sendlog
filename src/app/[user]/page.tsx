import { clerkClient } from "@clerk/express";
import { TopNav } from "../_components/topnav";

export async function generateStaticParams() {
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
        <main>
            <TopNav title={user.username ?? "404"} />
            <div className="mt-20 px-6 pb-32">
                <div className="flex gap-4">
                    <img
                        src={user?.imageUrl}
                        className="h-24 w-24 rounded-full object-cover"
                        alt="Profile"
                    />
                    <div>
                        <h1 className="text-sm">{user.fullName}</h1>
                    </div>
                </div>
            </div>
        </main>
    );
}
