import { useState } from "react";

export function RatingInput({
    rating,
    setRating,
}: {
    rating: number;
    setRating: (rating: number) => void;
}) {
    const stars = 5;
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        let newRating = Math.ceil((x / width) * stars);
        newRating = Math.max(0, Math.min(newRating, stars)); // Ensure rating is between 0 and 5
        setHoverRating(newRating);
    };

    const handlePointerLeave = () => {
        setHoverRating(null);
    };

    const handlePointerUp = () => {
        if (hoverRating !== null) {
            setRating(hoverRating);
        }
    };

    return (
        <div className="space-y-1">
            <p>Rating</p>
            <div
                className="inline-flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-[.3rem]"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerUp={handlePointerUp}
            >
                <div className="flex gap-1">
                    {[...Array(stars)].map((_, index) => (
                        <span
                            key={index}
                            className={`${
                                (
                                    hoverRating !== null
                                        ? index < hoverRating
                                        : index < rating
                                )
                                    ? "text-primary"
                                    : "text-foreground/50"
                            } text-xl`}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="flex w-4 justify-center">
                    <span className="text-foreground/50">
                        ({hoverRating !== null ? hoverRating : rating})
                    </span>
                </div>
            </div>
        </div>
    );
}
