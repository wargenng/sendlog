"use client";

import { ChevronDownCircle, Ellipsis } from "lucide-react";
import SessionDrawer from "~/common/sessiondrawer/sessiondrawer";
import { SessionWithClimbs } from "~/server/queries";

interface SessionActionsProps {
    session: SessionWithClimbs;
}

export function SessionActions({ session }: SessionActionsProps) {
    return (
        <div className="flex flex-col justify-between">
            <ChevronDownCircle
                size={20}
                className="transition-transform duration-300"
                onClick={(e) => {
                    e.currentTarget.classList.toggle("rotate-180");
                }}
            />
            <SessionDrawer climbs={session.climbs} session={session}>
                <Ellipsis size={20} />
            </SessionDrawer>
        </div>
    );
}
