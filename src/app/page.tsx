import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/lXqKHYWPgVZHxCEneBV9a6jXxUs2gBWczRKwbpYEI3k5Dql1",
  "https://utfs.io/f/lXqKHYWPgVZH4xd5vstvbmXysOqIkEZl9TnRht7jfcd42BKY",
  "https://utfs.io/f/lXqKHYWPgVZHjU44gt9uIkxw0nlTbSiKChLzMcr8GV9JgF4X",
  "https://utfs.io/f/lXqKHYWPgVZH3wQrY79CmsHi6MS2ecyPV08LWnvoN5ZRDTdq",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
