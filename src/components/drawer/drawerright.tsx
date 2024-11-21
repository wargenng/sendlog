import { ChevronLeft } from "lucide-react";
import { DrawerClose } from "../ui/drawer";

export const DrawerRight = () => (
    <DrawerClose className="absolute ml-2 mt-4">
        <ChevronLeft size="30" className="" />
    </DrawerClose>
);
