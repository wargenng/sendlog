import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface ProfileButtonProps {
    type: string;
    value: string;
}

export function ProfileButton({ type, value }: ProfileButtonProps) {
    return (
        <div className="flex w-full items-center text-left">
            <Label className="w-1/4">{type}</Label>
            <div className="relative flex h-full w-3/4 flex-wrap items-start justify-start border-b px-0">
                {value !== "" ? (
                    <span className="flex w-full max-w-full overflow-hidden whitespace-normal text-left">
                        {value}
                    </span>
                ) : (
                    <p className="text-foreground/50">{type}</p>
                )}
            </div>
        </div>
    );
}
