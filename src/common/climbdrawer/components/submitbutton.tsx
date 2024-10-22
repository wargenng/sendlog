import { useRouter } from "next/navigation";
import { useState } from "react";
import { addClimb, editClimb } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation";
import { Button } from "~/components/ui/button";
import { Climb } from "~/server/db/schema";

interface SubmitButtonProps {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit: boolean;
    sessionId?: number;
    climb: Climb;
    setIsRejected: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SubmitButton({
    setIsUploading,
    isEdit,
    sessionId,
    climb,
    setIsRejected,
    setOpen,
}: SubmitButtonProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setIsUploading(true);
                console.log("submitting form");

                if (
                    !climb.name ||
                    !climb.grade ||
                    !climb.location ||
                    !climb.sendDate
                ) {
                    console.log(
                        "Name, grade, location, and date must not be empty",
                    );
                    setIsSubmitting(false);
                    setIsUploading(false);
                    setIsRejected(true);
                    return;
                }

                if (isEdit) {
                    await editClimb(
                        climb.id,
                        climb.name,
                        climb.grade,
                        climb.attempts ?? 0,
                        climb.rating ?? 0,
                        climb.notes ?? "",
                        climb.location,
                        climb.sendDate,
                    );
                } else {
                    await addClimb(
                        climb.name,
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
                router.refresh();
                setIsSubmitting(false);
                setIsUploading(false);
                setIsRejected(false);
                setOpen(false);
            }}
        >
            <Button
                type="submit"
                className="w-full items-center text-foreground"
            >
                {isSubmitting ? (
                    <LoadingAnimation />
                ) : isEdit ? (
                    "Save Changes"
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
}
