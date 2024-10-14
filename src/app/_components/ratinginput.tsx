export function RatingInput({
    rating,
    setRating,
}: {
    rating: number;
    setRating: (rating: number) => void;
}) {
    const stars = 5;

    return (
        <div className="space-y-1">
            <p>Rating</p>
            <div className="inline-flex items-center gap-2 rounded-lg border p-2">
                <div className="flex gap-1">
                    {[...Array(stars)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setRating(index + 1)}
                            className={`${
                                index < rating
                                    ? "text-primary"
                                    : "text-gray-500"
                            } text-2xl`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <div className="flex w-4 justify-center">
                    <span className="text-gray-500">({rating})</span>
                </div>
            </div>
        </div>
    );
}
