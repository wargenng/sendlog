import { ChevronDownCircle, Ellipsis } from "lucide-react";
import SessionDrawer from "~/common/sessiondrawer/sessiondrawer";
import type { SessionWithClimbs } from "~/server/queries";

interface SessionActionsProps {
    session: SessionWithClimbs;
    setShowClimbs: (showClimbs: boolean) => void;
    showClimbs: boolean;
    isEditable: boolean;
}

export function SessionActions({
    session,
    setShowClimbs,
    showClimbs,
    isEditable,
}: SessionActionsProps) {
    return (
        <div className="flex flex-col justify-between">
            <ChevronDownCircle
                size={20}
                className="transition-transform duration-300"
                onClick={(e) => {
                    e.currentTarget.classList.toggle("rotate-180");
                    setShowClimbs(!showClimbs);
                }}
            />
            {isEditable ? (
                <SessionDrawer climbs={session.climbs} session={session}>
                    <Ellipsis size={20} />
                </SessionDrawer>
            ) : null}
        </div>
    );
}
