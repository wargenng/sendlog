import { User } from "@clerk/nextjs/server";
import { UserChartsClient } from "./userchartsclient";
import { getUsersClimbs } from "~/server/queries";

interface UserChartsProps {
    user: User;
}

export async function UserCharts({ user }: UserChartsProps) {
    const climbs = await getUsersClimbs(user.id);

    return <UserChartsClient climbs={climbs} />;
}
