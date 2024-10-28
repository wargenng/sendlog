import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export function SignInCard() {
    return (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-6 p-10">
            <h1 className="text-2xl font-semibold">welcome to sendlog!</h1>
            <SignInButton>
                <Button
                    variant="default"
                    size="lg"
                    className="flex w-full gap-2 text-lg"
                >
                    <span>Sign in</span>
                </Button>
            </SignInButton>
            <SignUpButton>
                <Button
                    variant="default"
                    size="lg"
                    className="flex w-full gap-2 bg-accent text-lg text-accent-foreground"
                >
                    <span>Sign up</span>
                </Button>
            </SignUpButton>
        </div>
    );
}
