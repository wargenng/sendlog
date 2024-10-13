import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";
import { deleteClimb, getCurrentUsersClimbs } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const climbs = await getCurrentUsersClimbs();

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">please sign in</div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap gap-4">
          {climbs.map((climb) => (
            <div key={climb.id}>
              {climb.name}
              <form
                action={async () => {
                  "use server";

                  await deleteClimb(climb.id);
                }}
              >
                <Button type="submit" variant="destructive">
                  delete
                </Button>
              </form>
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
