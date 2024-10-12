import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getMyImages();

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">please sign in</div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <div key={post.id}>
              {post.name}
              <img src={post.url} className="w-48" />
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
