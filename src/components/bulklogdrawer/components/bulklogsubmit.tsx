import { useRouter } from "next/navigation";
import { useState } from "react";
import { addSession, bulkAddClimbs } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation/loadinganimation";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import type { Climb, Session } from "~/server/db/schema";

interface BulkLogSubmitProps {
    bulk: Climb[];
    setIsUploading: (isUploading: boolean) => void;
    setOpen: (open: boolean) => void;
    session: Session;
    sessionId: string;
    sessionTabValue: string;
    setIsRejected: (isRejected: boolean) => void;
}

export function BulkLogSubmit({
    bulk,
    setIsUploading,
    setOpen,
    session,
    sessionId,
    sessionTabValue,
    setIsRejected,
}: BulkLogSubmitProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();

                if (
                    bulk.length === 0 ||
                    (session.location === 0 && sessionId === "")
                ) {
                    toast({
                        title: "Rejected",
                        description: "Location, Date, and Climbs are required",
                    });
                    setIsRejected(true);
                    return;
                }
                setIsSubmitting(true);
                setIsUploading(true);

                console.log("submitting form");

                const climbs = bulk;
                console.log(sessionTabValue);
                if (sessionTabValue === "create") {
                    const newSessionId = (await addSession(
                        session,
                    )) as unknown as string;
                    console.log(newSessionId);
                    await bulkAddClimbs(climbs, newSessionId);
                } else {
                    await bulkAddClimbs(climbs, sessionId);
                }

                toast({
                    title: "Climbs logged",
                    description: "Your climbs have been logged",
                });
                setOpen(false);
                setIsUploading(false);
                setIsSubmitting(false);
                router.refresh();
            }}
        >
            <Button
                type="submit"
                className="w-full items-center text-primary-foreground"
            >
                {isSubmitting ? <LoadingAnimation /> : "Submit"}
            </Button>
        </form>
    );
}
