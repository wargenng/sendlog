import { Button } from "~/components/ui/button";
import { TopNav } from "../_components/topnav";

export default function GoalsPage() {
    return (
        <main>
            <TopNav title="goals" />
            <div className="mt-20 space-y-4 px-6 pb-32">
                <div>
                    <Button className="w-full text-foreground">
                        + Create Goal
                    </Button>
                </div>
            </div>
        </main>
    );
}
