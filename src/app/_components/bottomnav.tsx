"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ClimbDrawer } from "./climbdrawer";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function BottomNav() {
    const currentPath = usePathname();

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
                            <DashboardIcon />
                            <span className="text-xs font-normal">
                                Dashboard
                            </span>
                        </Link>
                        <Link
                            href="/friends"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/friends" ? "brightness-100" : "brightness-50"}`}
                        >
                            <FriendsIcon />
                            <span className="text-xs font-normal">Friends</span>
                        </Link>
                        <ClimbDrawer />
                        <Link
                            href="/goals"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/goals" ? "brightness-100" : "brightness-50"}`}
                        >
                            <GoalIcon />
                            <span className="text-xs font-normal">Goals</span>
                        </Link>
                        <Link
                            href="/more"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/more" ? "brightness-100" : "brightness-50"}`}
                        >
                            <MoreIcon />
                            <span className="text-xs font-normal">More</span>
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
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
    >
        <path
            fill="white"
            d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1"
        />
    </svg>
);
const GoalIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
    >
        <g
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
        >
            <path d="M10.66 10.66A1.9 1.9 0 0 0 10.1 12a1.9 1.9 0 0 0 1.9 1.9a1.9 1.9 0 0 0 1.34-.56" />
            <path d="M12 6.3a5.7 5.7 0 1 0 5.7 5.7" />
            <path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5m-5.975-3.524L12.95 11.05" />
            <path d="M20.94 5.844L17.7 6.3l.456-3.24a.19.19 0 0 0-.313-.161l-2.148 2.137a1.9 1.9 0 0 0-.513 1.72l.342 1.72l1.72.341a1.9 1.9 0 0 0 1.72-.513L21.1 6.157a.19.19 0 0 0-.162-.313" />
        </g>
    </svg>
);
const FriendsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
    >
        <path
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0 17v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5m6-17a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0 17v-4h-2l2-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1l2 6h-2v4"
        />
    </svg>
);
const MoreIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
    >
        <path
            fill="white"
            fillRule="evenodd"
            d="M5 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m7 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m10-1a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-2 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
            clipRule="evenodd"
        />
    </svg>
);
