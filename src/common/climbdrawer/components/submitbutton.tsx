import { useRouter } from "next/navigation";
import { useState } from "react";
import { addClimb, editClimb } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation";
import { Button } from "~/components/ui/button";

interface SubmitButtonProps {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit: boolean;
    climbId: number;
    name: string;
    grade: string;
    attempts: number;
    rating: number;
    notes: string;
    location: number;
    date: Date;
    sessionId?: number;
    setIsRejected: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SubmitButton({
    setIsUploading,
    isEdit,
    climbId,
    name,
    grade,
    attempts,
    rating,
    notes,
    location,
    date,
    sessionId,
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

                if (!name || !grade || !location || !date) {
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
                        climbId,
                        name,
                        grade,
                        attempts,
                        rating,
                        notes,
                        location,
                        date,
                    );
                } else {
                    await addClimb(
                        name,
                        grade,
                        attempts,
                        rating,
                        notes,
                        location,
                        date,
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
