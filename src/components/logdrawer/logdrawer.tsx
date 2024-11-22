import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "../ui/button";
import BulkLogDrawer from "../bulklogdrawer/bulklogdrawer";

interface LogDrawerProps {
    children: React.ReactNode;
}

export function LogDrawer({ children }: LogDrawerProps) {
    return (
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="w-full bg-transparent">
                <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <BulkLogDrawer>
                        <Button>Log a Session</Button>
                    </BulkLogDrawer>
                    <DrawerClose className="w-full">
                        <Button variant="outline" className="w-full">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
