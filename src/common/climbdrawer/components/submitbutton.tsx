import { useRouter } from "next/navigation";
import { useState } from "react";
import { addClimb, editClimb } from "~/app/api/climbActions";
import { Button } from "~/components/ui/button";

export function submitButton(
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean,
    climbId: number,
    name: string,
    grade: string,
    attempts: number,
    rating: number,
    notes: string,
    location: number,
    date: Date,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setIsUploading(true);
                console.log("submitting form");
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
                    );
                }
                console.log("submitted form");
                router.refresh();
                setIsSubmitting(false);
                setIsUploading(false);
                setOpen(false);
            }}
        >
            <Button
                type="submit"
                className="w-full items-center text-foreground"
            >
                {isSubmitting ? (
                    <Loading />
                ) : isEdit ? (
                    "Save Changes"
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
}

const Loading = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
    >
        <circle cx="18" cy="12" r="0" fill="currentColor">
            <animate
                attributeName="r"
                begin=".67"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
            />
        </circle>
        <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate
                attributeName="r"
                begin=".33"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
            />
        </circle>
        <circle cx="6" cy="12" r="0" fill="currentColor">
            <animate
                attributeName="r"
                begin="0"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
            />
        </circle>
    </svg>
);
