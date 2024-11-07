import { DatePicker } from "~/common/datepicker";
import { LocationsSheet } from "~/common/locationssheet";
import { SessionSheet } from "~/common/sessionssheet";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Session } from "~/server/db/schema";

interface SessionTabProps {
    isRejected: boolean;
    session: Session;
    setSession: (session: Session) => void;
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    sessions: Session[];
}

export function SessionTab({
    isRejected,
    session,
    setSession,
    sessionId,
    setSessionId,
    sessions,
}: SessionTabProps) {
    return (
        <div className="space-y-1">
            <p>Session</p>
            <Tabs defaultValue="existing" className="w-full">
                <TabsList>
                    <TabsTrigger value="existing">Existing Session</TabsTrigger>
                    <TabsTrigger value="create">Create Session</TabsTrigger>
                </TabsList>
                <TabsContent value="existing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Session</CardTitle>
                            <CardDescription>
                                Add climb to an existing session.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Enter Session Name</Label>
                                <SessionSheet
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
                            <CardTitle>Create Session</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">
                                    Enter Session Name
                                </Label>
                                <Input
                                    id="current"
                                    type="text"
                                    className="text-base"
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
                                <LocationsSheet
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
                        <CardFooter>
                            {/* <Button type="submit" variant="secondary">
                                Create Session
                            </Button> */}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
