import { Button } from "~/components/ui/button";

interface LogButtonProps {
    backgroundImage: string;
    text: string;
}

export function LogButton({ backgroundImage, text }: LogButtonProps) {
    return (
        <Button
            variant="secondary"
            className="relative aspect-square h-40 w-full overflow-hidden text-foreground"
        >
            <div
                className="duration-250 absolute inset-0 bg-cover bg-center opacity-25 transition-transform hover:scale-110"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            ></div>
            <span className="relative z-10">{text}</span>
        </Button>
    );
}
