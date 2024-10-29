"use client";

import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";

import { useState, type ReactNode } from "react";
import DrawerMainContent from "../drawermaincontent";
import { ClimbDrawer } from "../climbdrawer/climbdrawer";
import { LogButton } from "./components/logbutton";
import SessionDrawer from "../sessiondrawer/sessiondrawer";
import { BicepsFlexed, X } from "lucide-react";
import GoalDrawer from "../goaldrawer/goaldrawer";
import BulkLogDrawer from "../bulklogdrawer/bulklogdrawer";

interface LogDrawerProps {
    children: ReactNode;
}

export default function LogDrawer({ children }: LogDrawerProps) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="">
                <DrawerHeader className="flex flex-col items-start justify-start">
                    <DrawerTitle className="text-2xl">
                        Log an activity
                    </DrawerTitle>
                    <DrawerDescription>
                        Add a new session, climb to your logbook.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerMainContent>
                    <div className="flex justify-center gap-4">
                        <ClimbDrawer>
                            <Button
                                variant="secondary"
                                className="relative flex h-28 w-28 flex-col items-center justify-center overflow-hidden rounded-full text-foreground"
                            >
                                <div className="duration-250 absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-25 transition-transform hover:scale-110"></div>
                                <div className="relative flex h-10 w-10 items-center justify-center">
                                    <ClimbIcon />
                                </div>
                                <h1 className="relative z-10 text-xs">
                                    Log a climb
                                </h1>
                            </Button>
                        </ClimbDrawer>
                        <SessionDrawer>
                            <Button
                                variant="secondary"
                                className="relative flex h-28 w-28 flex-col items-center justify-center overflow-hidden rounded-full text-foreground"
                            >
                                <div className="duration-250 absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-25 transition-transform hover:scale-110"></div>
                                <div className="relative flex h-10 w-10 items-center justify-center">
                                    <SessionsIcon />
                                </div>
                                <h1 className="relative z-10 text-xs">
                                    Log a session
                                </h1>
                            </Button>
                        </SessionDrawer>
                        <BulkLogDrawer>
                            <Button
                                variant="secondary"
                                className="relative flex h-28 w-28 flex-col items-center justify-center overflow-hidden rounded-full text-foreground"
                            >
                                <div className="duration-250 absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-25 transition-transform hover:scale-110"></div>
                                <div className="relative flex h-10 w-10 items-center justify-center">
                                    <LightningIcon />
                                </div>
                                <h1 className="relative z-10 text-xs">
                                    Bulk log
                                </h1>
                            </Button>
                        </BulkLogDrawer>
                    </div>
                </DrawerMainContent>
                <DrawerFooter className="mb-4">
                    <DrawerClose className="flex w-full justify-center">
                        <X className="h-10 w-10 text-foreground" />
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const ClimbIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.25em"
        height="2.25em"
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
        width="3em"
        height="3em"
        viewBox="0 0 20 20"
    >
        <path
            fill="currentColor"
            d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.48 6.48 0 0 0-1.905 3.959q-.034.335.025.654a5 5 0 0 1-2.07-.655m14.95.654a5 5 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.48 6.48 0 0 1 1.907 3.96a2.3 2.3 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.84.84 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.84.84 0 0 1-.277.71A6.98 6.98 0 0 1 10 18a6.97 6.97 0 0 1-4.696-1.81"
        />
    </svg>
);
const LightningIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 24 24"
    >
        <path
            fill="currentColor"
            d="M13.493 3.659a1.25 1.25 0 0 0-.711-1.296a1.195 1.195 0 0 0-1.46.36L3.518 12.736a1.28 1.28 0 0 0-.16 1.302c.172.393.57.741 1.116.741h6.682l-.65 5.562a1.25 1.25 0 0 0 .711 1.296a1.195 1.195 0 0 0 1.46-.36l7.803-10.013a1.28 1.28 0 0 0 .16-1.302a1.22 1.22 0 0 0-1.116-.741h-6.682z"
        />
    </svg>
);
