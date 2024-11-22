import { DatePicker } from "~/components/datepicker/datepicker";
import { SessionsDrawer } from "~/components/sessiontabs/components/sessionsdrawer/sessionsdrawer";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Session } from "~/server/db/schema";
import { LocationsDrawer } from "../locationsdrawer/locationsdrawer";
import { Input } from "../input/input";

interface SessionTabProps {
    isRejected: boolean;
    session: Session;
    setSession: (session: Session) => void;
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    sessions: Session[];
    sessionTabValue: string;
    setSessionTabValue: (sessionTabValue: string) => void;
}

export function SessionTab({
    isRejected,
    session,
    setSession,
    sessionId,
    setSessionId,
    sessions,
    sessionTabValue,
    setSessionTabValue,
}: SessionTabProps) {
    return (
        <div className="space-y-1">
            <Tabs
                defaultValue={sessionTabValue}
                onValueChange={(value) => {
                    setSessionTabValue(
                        sessionTabValue === "existing" ? "create" : "existing",
                    );
                }}
                className="w-full"
            >
                <TabsList className="w-full">
                    <TabsTrigger value="existing" className="w-1/2">
                        Existing Session
                    </TabsTrigger>
                    <TabsTrigger value="create" className="w-1/2">
                        Create Session
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="existing">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Existing Session
                            </CardTitle>
                            <CardDescription>
                                Add climb to an existing session.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Enter Session Name</Label>
                                <SessionsDrawer
                                    sessions={sessions}
                                    sessionId={sessionId}
                                    setSessionId={setSessionId}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="create">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Create Session
                            </CardTitle>
                            <CardDescription>
                                Create a new session.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">
                                    Enter Session Name
                                </Label>
                                <Input
                                    title="Enter Session Name"
                                    text={session.name}
                                    setText={(text) =>
                                        setSession({ ...session, name: text })
                                    }
                                />
                            </div>

                            <div className="w-full space-y-1">
                                <div className="flex justify-between">
                                    <p
                                        className={
                                            isRejected && !session.location
                                                ? "text-red-500"
                                                : ""
                                        }
                                    >
                                        Location *
                                    </p>
                                    <div className="italic text-red-500/50">
                                        {isRejected &&
                                            !session.location &&
                                            "Location is required"}
                                    </div>
                                </div>
                                <LocationsDrawer
                                    location={session.location}
                                    setLocation={(location) => {
                                        setSession({
                                            ...session,
                                            location: location,
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-full space-y-1">
                                <div className="flex justify-between">
                                    <p
                                        className={
                                            isRejected && !session.date
                                                ? "text-red-500"
                                                : ""
                                        }
                                    >
                                        Date *
                                    </p>
                                    <div className="italic text-red-500/50">
                                        {isRejected &&
                                            !session.date &&
                                            "Date is required"}
                                    </div>
                                </div>
                                <DatePicker
                                    date={session.date}
                                    setDate={(date: Date) => {
                                        setSession({
                                            ...session,
                                            date: date,
                                        });
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
