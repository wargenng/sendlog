"use client";

import Image from "next/image";
import { useState } from "react";
import { locations } from "~/app/utils/locations";
import type { Climb } from "~/server/db/schema";
import type { SessionWithClimbs } from "~/server/queries";
import { SessionActions } from "./sessionactions";
import { SessionClimbCard } from "./sessionclimbcard";
import { SessionDetails } from "./sessiondetails";
import type { User } from "@clerk/nextjs/server";

interface SessionCardProps {
    session: SessionWithClimbs;
    userImage: string;
    userFullName: string;
}

export function SessionCardClient({
    session,
    userImage,
    userFullName,
}: SessionCardProps) {
    const location = locations.find(
        (location) => location.id === session.location,
    );
    const [showClimbs, setShowClimbs] = useState(false);

    return (
        <div className="flex flex-col gap-2 bg-secondary px-4 py-2">
            <div className="flex items-center gap-2">
                <Image
                    className="h-10 w-10 rounded-full object-cover"
                    src={userImage}
                    alt="user image"
                    width={40}
                    height={40}
                />
                <div className="space-y-1">
                    <h1 className="text-sm">{userFullName}</h1>
                    <div className="flex gap-1">
                        <ClimbLogo />
                        <p className="text-xs">
                            {new Date(session.date).toLocaleDateString(
                                "en-US",
                            ) === new Date().toLocaleDateString("en-US")
                                ? "Today"
                                : new Date(session.date).toLocaleDateString(
                                      "en-US",
                                      {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                      },
                                  )}{" "}
                            at{" "}
                            {new Date(session.date).toLocaleTimeString(
                                "en-US",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                },
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between">
                <SessionDetails session={session}>
                    <div
                        className={`relative flex w-full items-center gap-2 overflow-hidden text-left`}
                    >
                        <Image
                            className="h-16 w-16 rounded-lg object-cover"
                            src={
                                location?.image ?? "/path/to/default/image.jpg"
                            }
                            alt="location image"
                            width={96}
                            height={96}
                        />
                        <div className={`relative w-full p-2`}>
                            <div className="flex items-center justify-between">
                                <h1 className="text-base">{session.name}</h1>
                            </div>
                            <p className="text-xs text-foreground/50">
                                Session · {location?.label}
                            </p>
                        </div>
                    </div>
                </SessionDetails>
                <SessionActions
                    session={session}
                    setShowClimbs={setShowClimbs}
                    showClimbs={showClimbs}
                />
            </div>
            <div
                className={`flex flex-col gap-4 pl-4 transition-all duration-500 ${
                    showClimbs
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                {session.climbs.map((climb: Climb) => (
                    <SessionClimbCard climb={climb} key={climb.id} />
                ))}
            </div>
        </div>
    );
}

export const ClimbLogo = () => (
    <svg
        fill="currentColor"
        height="1rem"
        width="1rem"
        version="1.2"
        baseProfile="tiny"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
    >
        <g id="XMLID_2_">
            <path
                id="XMLID_7_"
                d="M131.9,169.1c-2.3,0.9-5,1.4-7.7,1.4c-2.9,0-5.7-0.3-8.4-1.1l-29.7,68.3c-2.7,6.3-10.2,8.4-16.7,4.8
		c-6.5-3.7-9.6-11.7-6.8-18l36.4-83.6h46.5v-7.8l23.5-10.9c6.2-3,14.2,2.1,15.8,8.6l11.5,46.2c1.6,6.6-2.4,13.2-8.9,14.8
		c-6.6,1.6-13.2-2.4-14.9-8.9l-7.3-29.5L131.9,169.1z"
            />
            <path
                id="XMLID_6_"
                d="M153.3,121.2C204.2,95.9,223.9,9.5,223.9,2.3h-7c-2.6,18-24.5,90.2-63.6,111.1V121.2z"
            />
            <path
                id="XMLID_5_"
                d="M59.4,102.3c2.7,4.2,8,6,12.8,4l26.9-10.5v37.3h46.5V89.9l41.7-66.6c3.1-4.9,1.6-11.3-3.3-14.4
		c-4.9-3.1-11.3-1.6-14,3.1l-35.4,56.6l-21.3,0.1c-1.4,0-2.7,0.2-4.1,0.8L72.3,83.8l-19-28.8c-3.1-4.8-9.6-6.2-14.4-3.1
		c-4.9,3.1-6.3,9.6-3.2,14.5L59.4,102.3z"
            />
            <path
                id="XMLID_4_"
                d="M119.1,64.8c10.2,0,18.5-8.3,18.5-18.5s-8.3-18.5-18.5-18.5c-10.2,0-18.5,8.3-18.5,18.5
		S108.9,64.8,119.1,64.8z"
            />
            <polygon
                id="XMLID_3_"
                points="145.5,253.8 145.5,170.5 137.7,174.1 137.7,253.8 	"
            />
        </g>
    </svg>
);

export const BoulderLogo = () => (
    <svg
        fill="currentColor"
        height="1rem"
        width="1rem"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 304.515 304.515"
        enableBackground="new 0 0 304.515 304.515"
    >
        <g>
            <g>
                <path d="m148.078,256.816l-25.964-18.122-10.657-1.392 15.756,56.255c2.236,7.983 10.519,12.631 18.49,10.398 7.977-2.234 12.633-10.513 10.399-18.49l-8.024-28.649z" />
                <circle cx="62.034" cy="61.041" r="25.907" />
                <path d="m187.079,232.819l-46.337-32.342c-1.975-1.379-4.253-2.261-6.642-2.574l-59.266-7.744c2.483,5.066 10.024,17.088 0.728,30.351l51.015,6.665 43.33,30.244c6.808,4.751 16.154,3.064 20.886-3.715 4.742-6.793 3.079-16.143-3.714-20.885z" />
                <path d="m277.617,0h-179.556c-1.313,0-2.467,0.867-2.833,2.128s0.145,2.611 1.254,3.314l8.584,5.441-.975,56.237-23.316,25.842-30.97,3.172c-9.615,0.985-16.611,9.578-15.627,19.193l.912,8.902 13.95-14.214-26.716,44.352c-2.114,3.622-2.269,8.053-0.43,11.805l22.403,45.75c3.08,6.285 10.641,8.706 16.726,5.722 6.228-3.052 8.749-10.552 5.722-16.726l-19.031-38.825 23.973-41.053-10.414,37.143-.768,2.741 12.829,26.172 34.443-3.016-7.701-75.191 25.73-28.517c2.033-2.254 3.178-5.17 3.219-8.204l.612-45.104c3.917,3.635 6.836,8.259 8.415,13.433l10.505,34.42c1.42,4.654 3.935,8.9 7.333,12.382l36.043,36.93c5.928,6.074 9.052,14.346 8.62,22.822l-2.874,56.391c-0.293,5.751 1.05,11.467 3.874,16.486l25.059,44.532c3.008,5.345 7.56,9.658 13.06,12.373l35.164,17.359c1.947,0.961 4.252,0.849 6.095-0.297 1.844-1.146 2.965-3.163 2.965-5.334v-282.281c0.001-3.468-2.811-6.28-6.279-6.28z" />
            </g>
        </g>
    </svg>
);
