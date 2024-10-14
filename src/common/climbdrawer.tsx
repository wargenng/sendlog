"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import * as React from "react";
import { GradeCombobox } from "../app/_components/gradecombobox";
import { Input } from "~/components/ui/input";
import { addClimb } from "~/app/api/addClimb";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

export function ClimbDrawer() {
  const router = useRouter();
  const [grade, setGrade] = useState("V4");
  const [name, setName] = useState("Jones'n");
  const [attempts, setAttempts] = useState(1);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-dvh">
        <DrawerHeader className="flex flex-col items-start justify-start">
          <DrawerTitle>Enter a climb</DrawerTitle>
          <DrawerDescription>details for climb go below</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-2 overflow-y-auto p-4 text-sm">
          <div className="space-y-1">
            <p>Name</p>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-base"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2 space-y-1">
              <p>Grade</p>
              <GradeCombobox grade={grade} setGrade={setGrade} />
            </div>
            <div className="w-1/2 space-y-1">
              <p>Attempts</p>
              <Input
                type="number"
                placeholder="Enter attempts"
                value={attempts}
                onChange={(e) => setAttempts(Number(e.target.value))}
                className="text-base"
              />
            </div>
          </div>
          {/* <div className="space-y-1">
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
                      <Input id="current" type="text" className="text-base" />
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
          </div> */}
          <div className="space-y-1">
            <p>Notes</p>
            <Textarea className="text-base" />
          </div>
          <div className="mt-4 space-y-2">
            <DrawerClose asChild>
              <form
                action={async () => {
                  await addClimb(name, grade);

                  router.refresh();
                }}
              >
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
