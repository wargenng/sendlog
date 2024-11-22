import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteSession } from "~/app/api/climbActions";
import { LoadingAnimation } from "~/components/loadinganimation/loadinganimation";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/hooks/use-toast";

interface DeleteButtonProps {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    sessionId: number;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRejected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteSessionForm({
    setIsUploading,
    sessionId,
    setFormOpen,
    setIsRejected,
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="submit"
                    variant="destructive"
                    className="w-full items-center text-foreground"
                >
                    {isDeleting ? <LoadingAnimation /> : "Delete Session"}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-96 rounded-lg">
                <DialogHeader className="text-left">
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will delete your
                        session along with all of that session&apos;s climbs.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setIsDeleting(true);
                            setIsUploading(true);
                            console.log("deleting form");
                            if (sessionId !== undefined) {
                                await deleteSession(sessionId);
                            }
                            console.log("deleted form");
                            toast({
                                title: "Deleted Session",
                            });
                            router.refresh();
                            setIsRejected(false);
                            setIsDeleting(false);
                            setIsUploading(false);
                            setFormOpen(false);
                            setOpen(false);
                        }}
                    >
                        <Button
                            type="submit"
                            className="relative w-full"
                            variant="destructive"
                        >
                            Delete Session
                        </Button>
                    </form>
                    <DialogClose
                        type="submit"
                        className="relative w-full"
                        asChild
                    >
                        <Button
                            type="submit"
                            className="w-full"
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
