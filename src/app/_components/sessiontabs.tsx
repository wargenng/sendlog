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

export function SessionTab() {
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
                            <Input
                                id="name"
                                defaultValue="Session 1"
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="create">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Session</CardTitle>
                        <CardDescription>
                            Create a new session to add the climb to.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Enter Session Name</Label>
                            <Input
                                id="current"
                                type="text"
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="location">Enter Location</Label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="Optional..."
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="location">Enter Type</Label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="Optional..."
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" variant="secondary">
                            Create Session
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>;
}
