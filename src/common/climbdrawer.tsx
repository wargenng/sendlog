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

export function ClimbDrawer() {
  const router = useRouter();
  const [grade, setGrade] = useState("V4");
  const [name, setName] = useState("Jones'n");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Enter a climb</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="flex w-full justify-center">
          details for climb go below
        </DrawerDescription>
        <div className="p-4">
          <div>
            <p>name</p>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>grade</p>
            <GradeCombobox />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <form
              action={async () => {
                await addClimb(name, grade);

                router.refresh();
              }}
            >
              <Button type="submit">Submit</Button>
            </form>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
