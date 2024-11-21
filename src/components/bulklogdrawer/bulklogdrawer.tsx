import { type ReactNode } from "react";
import { getUsersSessions } from "~/app/api/sessionActions";
import type { Session } from "~/server/db/schema";
import BulkLogDrawerClient from "./bulklogdrawerclient";

interface BulkLogProps {
    children: ReactNode;
}

export default async function BulkLogDrawer({ children }: BulkLogProps) {
    const sessions = (await getUsersSessions()) as Session[];

    return (
        <BulkLogDrawerClient sessions={sessions}>
            {children}
        </BulkLogDrawerClient>
    );
}
