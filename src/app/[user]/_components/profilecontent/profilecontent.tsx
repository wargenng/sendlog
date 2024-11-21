import type { User } from "@clerk/nextjs/server";
import { CalendarDays, ChartPie, UsersRound } from "lucide-react";
import { ClimbCalendar } from "~/components/climbs/climbcalendar";
import { ProfileSessions } from "~/components/sessions/profilesessions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserCharts } from "../charts/usercharts";

interface ProfileContentProps {
    user: User;
    users: User[];
}

export function ProfileContent({ user, users }: ProfileContentProps) {
    return (
        <Tabs defaultValue="statistics" className="w-full">
            <TabsList className="h-14 w-full justify-between rounded-none bg-secondary">
                <TabsTrigger
                    value="statistics"
                    className="flex w-1/3 justify-center data-[state=active]:bg-black/0"
                >
                    <ChartPie size={28} />
                </TabsTrigger>
                <TabsTrigger
                    value="sessions"
                    className="flex w-1/3 justify-center data-[state=active]:bg-black/0"
                >
                    <UsersRound size={28} />
                </TabsTrigger>
                <TabsTrigger
                    value="climbs"
                    className="flex w-1/3 justify-center data-[state=active]:bg-black/0"
                >
                    <CalendarDays size={28} />
                </TabsTrigger>
            </TabsList>
            <TabsContent value="statistics">
                <UserCharts user={user} />
            </TabsContent>
            <TabsContent value="sessions">
                <ProfileSessions user={user} users={users} />
            </TabsContent>
            <TabsContent value="climbs">
                <ClimbCalendar user={user} />
            </TabsContent>
        </Tabs>
    );
}
