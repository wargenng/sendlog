"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ClimbDrawer } from "../../common/climbdrawer";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

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
                            href="/sessions"
                            className={`flex w-1/5 flex-col items-center space-y-1 ${currentPath === "/sessions" ? "brightness-100" : "brightness-50"}`}
                        >
                            <SessionsIcon />
                            <span className="text-xs font-normal">
                                Sessions
                            </span>
                        </Link>
                        <ClimbDrawer isEdit={false}>
                            <Button
                                variant="default"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-primary"
                            >
                                <Plus className="h-6 w-6" />
                            </Button>
                        </ClimbDrawer>
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
            fill="currentColor"
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
            stroke="currentColor"
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
const MoreIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M5 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m7 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m10-1a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-2 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
            clipRule="evenodd"
        />
    </svg>
);
const SessionsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
    >
        <path
            fill="none"
            stroke="currentColor"
            d="m16 4l-3.621 3.621a3 3 0 0 1-2.122.879H6.5l-2.121 2.121a3 3 0 0 0-.879 2.122V16m3-5v4.556a1.945 1.945 0 0 0 3.32 1.374l3.43-3.43h.25l.296.592A7.08 7.08 0 0 0 17.5 17.5m-5.5.498l-.056-.11l-.194-.388zm0 0A10.62 10.62 0 0 0 17.5 23m2 1V8L17 5.5m-5-5L14.5 3m-4 5.5v5m-2.805-7s-1.81-.557-2.135-1.776a1.77 1.77 0 0 1 1.242-2.163a1.75 1.75 0 0 1 2.146 1.25c.324 1.219-.962 2.61-.962 2.61z"
        />
    </svg>
);
