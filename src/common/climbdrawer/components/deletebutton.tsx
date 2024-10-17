import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteClimb } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation";
import { Button } from "~/components/ui/button";

interface DeleteButtonProps {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    climbId: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteClimbForm({
    setIsUploading,
    climbId,
    setOpen,
}: DeleteButtonProps) {
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
                {isDeleting ? <LoadingAnimation /> : "Delete Climb"}
            </Button>
        </form>
    );
}
