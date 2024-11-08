import { User } from "@clerk/nextjs/server";
import { CalendarDays, ChartPie, MountainSnow, UsersRound } from "lucide-react";
import { UserCharts } from "../charts/usercharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ProfileSessions } from "~/app/_components/sessions/profilesessions";
import { ClimbCalendar } from "~/app/_components/climbs/climbcalendar";

interface ProfileContentProps {
    user: User;
}

export function ProfileContent({ user }: ProfileContentProps) {
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
                <ProfileSessions user={user} />
            </TabsContent>
            <TabsContent value="climbs">
                <ClimbCalendar user={user} />
            </TabsContent>
        </Tabs>
    );
}
