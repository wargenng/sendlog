import type { User } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { ProfileClimbs } from "~/app/_components/climbs/profileclimbs";
import { FollowerAmount } from "./friends/followersamount";
import { FriendAmount } from "./friends/friendamount";
import { ProfileActions } from "./profileactions";
import { UserAreaChart } from "./userareachart";
import { UserPieChart } from "./userpiechart";

interface UserProfileProps {
    username: string;
}

export async function UserProfile({ username }: UserProfileProps) {
    const response = await clerkClient().users.getUserList();
    const users = response.data;
    const user = users.find((user: User) => user.username === username);
    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <div className="mt-16 space-y-2 pb-32">
            <div className="flex flex-col gap-6 bg-secondary p-6">
                <div className="flex items-center gap-2">
                    {user?.imageUrl ? (
                        <Image
                            src={user?.imageUrl}
                            className="h-12 w-12 rounded-full object-cover"
                            alt="Profile"
                            width={96}
                            height={96}
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
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold">
                            {user.fullName}
                        </h1>
                        <h1 className="text-sm text-foreground/50">
                            @{user.username}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                        <FollowerAmount userId={user.id} />
                        <FriendAmount userId={user.id} />
                    </div>
                    <div className="">
                        <ProfileActions userId={user.id} />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-sm"></p>
            </div>
            <UserAreaChart />
            <UserPieChart />
            {/* <ProfileClimbs user={user.id.toString()} /> */}
        </div>
    );
}
