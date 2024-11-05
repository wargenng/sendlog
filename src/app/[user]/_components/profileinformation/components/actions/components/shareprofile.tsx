"use client";

import { Share } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

interface ShareProfileProps {
    username: string;
}

export function ShareProfile({ username }: ShareProfileProps) {
    const { toast } = useToast();

    return (
        <div className="">
            <Button
                variant="link"
                className="flex w-full gap-1 rounded-lg border border-accent text-accent"
                onClick={async () => {
                    await navigator.clipboard.writeText(
                        `https://sendlog.vercel.app/${username}`,
                    );
                    toast({
                        title: "Copied to clipboard",
                    });
                }}
            >
                <Share size={14} />
                <p>Share</p>
            </Button>
        </div>
    );
}
