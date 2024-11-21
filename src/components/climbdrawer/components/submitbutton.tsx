import { useRouter } from "next/navigation";
import { useState } from "react";
import { addClimb, editClimb } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation/loadinganimation";
import { Button } from "~/components/ui/button";
import type { Climb } from "~/server/db/schema";
import { useToast } from "~/hooks/use-toast";

interface SubmitButtonProps {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    sessionId?: number;
    climb: Climb;
    setIsRejected: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SubmitButton({
    setIsUploading,
    sessionId,
    climb,
    setIsRejected,
    setOpen,
}: SubmitButtonProps) {
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

                if (!climb.grade || !climb.location || !climb.sendDate) {
                    console.log("Grade, location, and date must not be empty");
                    setIsSubmitting(false);
                    setIsUploading(false);
                    setIsRejected(true);
                    return;
                }

                if (climb.id) {
                    await editClimb(
                        climb.id,
                        climb.name ?? "",
                        climb.grade,
                        climb.attempts ?? 0,
                        climb.rating ?? 0,
                        climb.notes ?? "",
                        climb.location,
                        climb.sendDate,
                    );
                } else {
                    await addClimb(
                        climb.name ?? "",
                        climb.grade,
                        climb.attempts ?? 0,
                        climb.rating ?? 0,
                        climb.notes ?? "",
                        climb.location,
                        climb.sendDate,
                        sessionId,
                    );
                }
                console.log("submitted form");
                toast({
                    title: "Climb submitted",
                    description: "Your climb has been submitted successfully",
                });
                router.refresh();
                setIsSubmitting(false);
                setIsUploading(false);
                setIsRejected(false);
                setOpen(false);
            }}
        >
            <Button
                type="submit"
                className="w-full items-center text-primary-foreground"
            >
                {isSubmitting ? (
                    <LoadingAnimation />
                ) : climb.id ? (
                    "Save Changes"
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
}
