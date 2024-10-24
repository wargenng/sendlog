import { Button } from "~/components/ui/button";
import Image from "next/image";

interface LogButtonProps {
    backgroundImage: string;
    text: string;
}

export function LogButton({ backgroundImage, text }: LogButtonProps) {
    return (
        <Button
            variant="secondary"
            className="relative aspect-square h-24 w-full overflow-hidden text-foreground"
        >
            <Image
                src={backgroundImage}
                alt={text}
                className="duration-250 absolute inset-0 h-full w-full object-cover opacity-25 transition-transform hover:scale-110"
                width={400}
                height={400}
            />
            <span className="relative z-10">{text}</span>
        </Button>
    );
}
