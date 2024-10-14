import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCurrentUsersSessions } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const sessions = await getCurrentUsersSessions();

  return (
    <main className="mt-16 p-6">
      <SignedOut>
        <div className="h-full w-full text-2xl">please sign in</div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap gap-4">
          {sessions.map((session) => (
            <div key={session.id}>
              <h1>{session.name}</h1>
              <ul className="flex flex-wrap gap-x-1">
                {session.climbs.map((climb) => (
                  <li key={climb.id}>
                    {climb.name} {climb.grade}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
