import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { addClimb, bulkAddClimbs } from "~/app/api/climbActions";
import { grades } from "~/app/utils/grades";
import { getCurrentUsersSessions } from "~/server/queries";
import { db } from "~/server/db";
import { LoadingAnimation } from "~/components/loadinganimation";

interface BulkLogSubmitProps {
    bulk: string;
    setIsUploading: (isUploading: boolean) => void;
    setOpen: (open: boolean) => void;
    location: number;
    date: Date;
}

export function BulkLogSubmit({
    bulk,
    setIsUploading,
    setOpen,
    location,
    date,
}: BulkLogSubmitProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setIsUploading(true);
                console.log("submitting form");

                const climbs = bulk.split(" ");
                await bulkAddClimbs(climbs, location, date);

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
