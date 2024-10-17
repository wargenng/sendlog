import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";
import { TopNav } from "../_components/topnav";
import { Button } from "~/components/ui/button";
import { RecentClimbs } from "../_components/recentclimbs";

export const dynamic = "force-dynamic";

interface Params {
    params: {
        user: string;
    };
}

export default async function UserPage({ params }: Params) {
    const { user: username } = params;

    try {
        const response = await clerkClient().users.getUserList();
        const users = response.data;
        const user = users.find((user: User) => user.username === username);

        if (!user) {
            return <p>User not found</p>;
        }

        return (
            <main>
                <TopNav title={user.username ?? "404"} />
                <div className="mt-20 px-6 pb-32">
                    <div className="flex gap-6">
                        {user?.imageUrl ? (
                            <img
                                src={user?.imageUrl}
                                className="h-24 w-24 rounded-full object-cover"
                                alt="Profile"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="6rem"
                                height="6rem"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M8 14.5a6.47 6.47 0 0 0 3.25-.87V11.5A2.25 2.25 0 0 0 9 9.25H7a2.25 2.25 0 0 0-2.25 2.25v2.13A6.47 6.47 0 0 0 8 14.5m4.75-3v.937a6.5 6.5 0 1 0-9.5 0V11.5a3.75 3.75 0 0 1 2.486-3.532a3 3 0 1 1 4.528 0A3.75 3.75 0 0 1 12.75 11.5M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M9.5 6a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                        <div className="flex h-24 flex-col justify-center space-y-1">
                            <h1 className="text-lg font-semibold">
                                {user.fullName}
                            </h1>
                            <div className="flex gap-8">
                                <div className="-space-y-1">
                                    <p className="text-base">V8</p>
                                    <p className="text-xs">grade</p>
                                </div>
                                <div className="-space-y-1">
                                    <p className="text-base">404</p>
                                    <p className="text-xs">climbs</p>
                                </div>
                                <div className="-space-y-1">
                                    <p className="text-base">28</p>
                                    <p className="text-xs">sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className="mt-4 w-full">Follow</Button>
                    <RecentClimbs />
                </div>
            </main>
        );
    } catch (error) {
        console.error("Error fetching user data:", error);
        return <p>Internal Server Error</p>;
    }
}
