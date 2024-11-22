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
import { DrawerRight } from "../drawer/drawerright";
import { Input as ShadInput } from "../ui/input";

interface InputProps {
    title: string;
    text: string;
    setText: (text: string) => void;
}

export function Input({ title, text, setText }: InputProps) {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button
                    variant="none"
                    className="w-full justify-start border text-left"
                >
                    {text}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full px-4">
                <DrawerRight />
                <DrawerHeader className="mt-2">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <ShadInput
                    id="current"
                    type="text"
                    value={text}
                    onChange={(e) => {
                        if (e.target.value.length <= 40) {
                            setText(e.target.value);
                        }
                    }}
                    className="text-base"
                />
                <div className="mt-4 flex w-full justify-end">
                    {text.length}/40
                </div>
                <DrawerFooter className="mb-4">
                    <DrawerClose>
                        <Button variant="outline" className="w-full">
                            Done
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
