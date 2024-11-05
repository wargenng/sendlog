import { User } from "@clerk/nextjs/server";
import { UserChartsClient } from "./userchartsclient";

interface UserChartsProps {
    user: User;
}

export function UserCharts({ user }: UserChartsProps) {
    return <UserChartsClient />;
}
