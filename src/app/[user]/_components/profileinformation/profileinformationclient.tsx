import type { User } from "@clerk/nextjs/server";
import Image from "next/image";
import { ProfileActions } from "./components/actions/profileactions";
import { FollowerAmount } from "./components/friends/followersamount";
import { FriendAmount } from "./components/friends/friendamount";
import { ProfileBio } from "./components/profilebio";

interface ProfileInformationProps {
    user: User;
    users: User[];
}

export function ProfileInformationClient({
    user,
    users,
}: ProfileInformationProps) {
    return (
        <div className="flex flex-col gap-6 bg-secondary px-6 pb-2 pt-6">
            <div className="flex items-center gap-4">
                {user?.imageUrl ? (
                    <Image
                        src={user?.imageUrl}
                        className="h-20 w-20 rounded-full object-cover"
                        alt="Profile"
                        width={80}
                        height={80}
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
                <div className="flex flex-col space-y-2">
                    <h1 className="text-sm font-semibold">{user.fullName}</h1>
                    <div className="flex gap-8">
                        <FollowerAmount user={user} users={users} />
                        <FriendAmount user={user} users={users} />
                    </div>
                </div>
            </div>
            <ProfileBio
                bio={
                    (users.find((userlist) => userlist.id === user.id)
                        ?.unsafeMetadata?.bio as string) || ""
                }
            />
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <ProfileActions user={user} />
                </div>
            </div>
        </div>
    );
}
