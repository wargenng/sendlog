"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";
import LogDrawer from "~/common/logdrawer/logdrawer";

export function BottomNav() {
    const currentPath = usePathname();
    const { user } = useUser();

    return (
        <nav className="fixed bottom-0 flex w-full items-center justify-center border-t bg-background p-4 text-xl font-semibold">
            <div className="flex w-full flex-row items-center space-x-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <div className="flex w-full justify-around gap-2 pb-4">
                        <Link
                            href="/"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/" ? "brightness-100" : "brightness-50"}`}
                        >
                            <div className="flex h-7 w-7 items-center justify-center">
                                <DashboardIcon />
                            </div>
                            <span className="text-xs font-normal">
                                Dashboard
                            </span>
                        </Link>
                        <Link
                            href="/climbs"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/climbs" ? "brightness-100" : "brightness-50"}`}
                        >
                            <div className="flex h-7 w-7 items-center justify-center">
                                <ClimbIcon />
                            </div>
                            <span className="text-xs font-normal">Climbs</span>
                        </Link>
                        <LogDrawer>
                            <Button
                                variant="default"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-primary"
                            >
                                <Plus className="h-6 w-6 text-primary-foreground" />
                            </Button>
                        </LogDrawer>
                        <Link
                            href="/sessions"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/sessions" ? "brightness-100" : "brightness-50"}`}
                        >
                            <div className="flex h-7 w-7 items-center justify-center">
                                <SessionsIcon />
                            </div>
                            <span className="text-xs font-normal">
                                Sessions
                            </span>
                        </Link>
                        <Link
                            href={`/${user?.username}`}
                            className={`flex w-1/5 flex-col items-center space-y-1.5 ${currentPath === `/${user?.username}` ? "brightness-100" : "brightness-50"}`}
                        >
                            <div className="flex h-7 w-7 items-center justify-center">
                                {user?.imageUrl ? (
                                    <Image
                                        src={user.imageUrl}
                                        className="h-7 w-7 rounded-full object-cover"
                                        alt="Profile"
                                        width={28}
                                        height={28}
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1.75rem"
                                        height="1.75rem"
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
                            </div>
                            <span className="text-xs font-normal">Profile</span>
                        </Link>
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}

const DashboardIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
    >
        <path
            fill="currentColor"
            d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1"
        />
    </svg>
);
const ClimbIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 50 50"
    >
        <path
            fill="currentColor"
            d="M6.432 21.55a5.2 5.2 0 0 0-.519 2.261l.193 12.125l-4.205 9.024a2.7 2.7 0 0 0-.301.902a2.723 2.723 0 0 0 2.295 3.105a2.72 2.72 0 0 0 2.803-1.386l4.626-9.864c.096-.229.182-.47.217-.734l.025-.372l-.036-7.496l7.109 3.092l1.148 7.326a2.725 2.725 0 0 0 2.259 2.106a2.75 2.75 0 0 0 3.118-2.285c.035-.253.035-.506.011-.746l-1.401-8.844a2.76 2.76 0 0 0-1.534-1.962l-6.354-2.812l4.046-7.014l2.007 2.539c.205.228.471.421.772.541l7.648 2.225a2.154 2.154 0 0 0 2.452-1.286a2.15 2.15 0 0 0-1.183-2.803l-.109-.036l-6.645-1.949l-5.002-5.979a5.07 5.07 0 0 0-2.911-1.541a4.99 4.99 0 0 0-4.972 2.298zm21.939 17.384l-.483 3.633l-13.156 3.187l.127 2.246h32.086A2.046 2.046 0 0 0 49 45.957l-.036-43.069l-4.396-1.022l-2.526 11.323l-4.223 1.768l-3.745 10.441l3.558 7.989l-1.002 3.067zM19.438 9.157c2.259 0 4.095-1.828 4.095-4.078C23.532 2.83 21.697 1 19.438 1s-4.096 1.83-4.096 4.079c-.001 2.25 1.836 4.078 4.096 4.078m-8.149.638a1.16 1.16 0 0 0-.435-1.588L8.872 7.052a1.185 1.185 0 0 0-1.607.433L1.153 17.989a1.163 1.163 0 0 0 .434 1.588l1.994 1.144a1.17 1.17 0 0 0 1.594-.422z"
        />
    </svg>
);
const SessionsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 20 20"
    >
        <path
            fill="currentColor"
            d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.48 6.48 0 0 0-1.905 3.959q-.034.335.025.654a5 5 0 0 1-2.07-.655m14.95.654a5 5 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.48 6.48 0 0 1 1.907 3.96a2.3 2.3 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.84.84 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.84.84 0 0 1-.277.71A6.98 6.98 0 0 1 10 18a6.97 6.97 0 0 1-4.696-1.81"
        />
    </svg>
);
