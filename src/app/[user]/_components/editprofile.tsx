import { Button } from "~/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

export function EditProfile() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full text-foreground">Edit Profile</Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
