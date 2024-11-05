import { clerkClient, User } from "@clerk/nextjs/server";
import { UserChartsClient } from "./userchartsclient";
import { getUsersClimbs } from "~/server/queries";

interface UserChartsProps {
    username: string;
}

export async function UserCharts({ username }: UserChartsProps) {
    const response = await clerkClient().users.getUserList();
    const users = response.data;
    const user = users.find((user: User) => user.username === username);
    if (!user) {
        return <p>User not found</p>;
    }
    const climbs = await getUsersClimbs(user.id);

    return <UserChartsClient climbs={climbs} />;
}
