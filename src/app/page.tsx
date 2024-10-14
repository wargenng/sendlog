import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCurrentUsersClimbs } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <main className="mt-16 p-6">
            <SignedOut>
                <div className="h-full w-full text-2xl">please sign in</div>
            </SignedOut>
            <SignedIn>
                <div className="flex flex-col gap-4">
                    {climbs.map((climb) => (
                        <div key={climb.id}>
                            <h1>
                                {climb.name} {climb.grade}
                            </h1>
                        </div>
                    ))}
                </div>
            </SignedIn>
        </main>
    );
}
