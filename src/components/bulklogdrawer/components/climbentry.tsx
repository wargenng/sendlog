import { CircleX, Plus } from "lucide-react";
import { GradePickerDrawer } from "~/components/gradepickerdrawer/gradepickerdrawer";
import { GradeScrollable } from "~/components/gradesscrollable/gradescrollable";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import type { Climb } from "~/server/db/schema";

interface ClimbEntryProps {
    climbs: Climb[];
    setClimbs: (climbs: Climb[]) => void;
}

export function ClimbEntry({ climbs, setClimbs }: ClimbEntryProps) {
    return (
        <Card className="w-full space-y-2 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Climbs</h1>
                <Label
                    className={`${climbs.length > 0 ? "brightness-100" : "brightness-50"}`}
                >
                    {climbs.length}
                </Label>
            </div>
            <GradeScrollable climbs={climbs} setClimbs={setClimbs} />
            <div className="flex gap-4">
                <GradePickerDrawer climbs={climbs} setClimbs={setClimbs}>
                    <Button
                        variant="none"
                        className="flex space-x-1 rounded-md border p-4"
                    >
                        <Plus size={16} />
                        <span>Add Climbs</span>{" "}
                    </Button>
                </GradePickerDrawer>
                <Button
                    variant="none"
                    className="flex space-x-1 rounded-md border p-4"
                    onClick={() => setClimbs([])}
                >
                    <CircleX size={16} />
                    <span>Clear All</span>
                </Button>
            </div>
        </Card>
    );
}
