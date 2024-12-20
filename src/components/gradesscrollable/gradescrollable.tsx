import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";

interface GradeScrollableProps {
    climbs: Climb[];
    setClimbs: (climbs: Climb[]) => void;
}

export function GradeScrollable({ climbs, setClimbs }: GradeScrollableProps) {
    return climbs.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto py-2">
            {climbs.map((climb, i) => (
                <Button
                    key={climb.name + climb.grade + i}
                    className={`flex space-x-1 rounded-lg border p-2 text-foreground opacity-100 transition-all duration-500`}
                    onClick={async () => {
                        setClimbs(climbs.filter((_, index) => index !== i));
                    }}
                    variant="none"
                >
                    <p>
                        {climb.name} {climb.grade}
                    </p>
                    <X className="h-4 w-4" />
                </Button>
            ))}
        </div>
    ) : (
        <div className="flex w-full items-center py-4 text-muted-foreground">
            no climbs added
        </div>
    );
}
