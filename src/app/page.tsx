import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCurrentUsersClimbs } from "~/server/queries";
import { locations } from "./utils/locations";
export const dynamic = "force-dynamic";

export default async function HomePage() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <main className="mt-16 p-6">
            <SignedOut>
                <div className="h-full w-full text-2xl">please sign in</div>
            </SignedOut>
            <SignedIn>
                <div className="space-y-2">
                    <h1 className="border-b text-2xl font-semibold">recent</h1>
                    <div className="flex flex-col gap-2">
                        {climbs.map((climb) => (
                            <div key={climb.id} className="border-b">
                                <h1>
                                    {climb.name} {climb.grade}
                                </h1>
                                {climb.rating ? (
                                    <p className="flex items-center text-xl text-primary">
                                        {"★".repeat(climb.rating)}
                                        {"★"
                                            .repeat(5 - climb.rating)
                                            .split("")
                                            .map((star, index) => (
                                                <span
                                                    key={index}
                                                    className="text-gray-500"
                                                >
                                                    {star}
                                                </span>
                                            ))}{" "}
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({climb.rating})
                                        </span>
                                    </p>
                                ) : null}
                                {climb.location ? (
                                    <p>
                                        {
                                            locations.find(
                                                (location) =>
                                                    location.id ===
                                                    climb.location,
                                            )?.label
                                        }
                                    </p>
                                ) : null}
                                {climb.sendDate ? (
                                    <p>
                                        {climb.sendDate.toLocaleDateString(
                                            undefined,
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            },
                                        )}
                                    </p>
                                ) : null}
                                {climb.attempts ? (
                                    <p>{climb.attempts} attempts</p>
                                ) : null}
                                <p className="italic">{climb.notes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SignedIn>
        </main>
    );
}
