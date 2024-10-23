import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteClimb } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

interface DeleteButtonProps {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    climbId: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRejected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteClimbForm({
    setIsUploading,
    climbId,
    setOpen,
    setIsRejected,
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    {isDeleting ? <LoadingAnimation /> : "Delete Climb"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your climb.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setIsDeleting(true);
                            setIsUploading(true);
                            console.log("deleting form");
                            await deleteClimb(climbId);
                            console.log("deleting form");
                            toast({
                                title: "Deleted Climb",
                                description: "Your climb has been deleted.",
                            });
                            router.refresh();
                            setIsDeleting(false);
                            setIsUploading(false);
                            setOpen(false);
                            setIsRejected(false);
                        }}
                    >
                        <Button type="submit">Delete Climb</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
