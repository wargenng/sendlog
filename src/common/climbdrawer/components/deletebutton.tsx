import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteClimb } from "~/app/api/climbActions";
import { Button } from "~/components/ui/button";

export function deleteClimbForm(
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
    climbId: number,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
): React.ReactNode {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setIsDeleting(true);
                setIsUploading(true);
                console.log("deleting form");
                await deleteClimb(climbId);
                console.log("deleting form");
                router.refresh();
                setIsDeleting(false);
                setIsUploading(false);
                setOpen(false);
            }}
        >
            <Button variant="destructive" className="w-full">
                {isDeleting ? <Loading /> : "Delete Climb"}
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
