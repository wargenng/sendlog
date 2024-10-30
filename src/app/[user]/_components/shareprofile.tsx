"use client";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

interface ShareProfileProps {
    username: string;
}

export function ShareProfile({ username }: ShareProfileProps) {
    const { toast } = useToast();

    return (
        <div className="space-y-2">
            <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                    navigator.clipboard.writeText(
                        `https://sendlog.vercel.app/${username}`,
                    );
                    toast({
                        title: "Copied to clipboard",
                    });
                }}
            >
                Share Profile
            </Button>
        </div>
    );
}
