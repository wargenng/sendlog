import { Button } from "~/components/ui/button";

interface UserChartFilterProps {
    filter: string;
    setFilter: (filter: string) => void;
}

export function UserChartFilter({ filter, setFilter }: UserChartFilterProps) {
    return (
        <div className="flex space-x-1 bg-secondary p-2">
            <Button
                className={`rounded-none ${filter === "Week" ? "text-accent" : ""}`}
                variant="link"
                onClick={() => setFilter("Week")}
            >
                Week
            </Button>
            <Button
                className={`rounded-none ${filter === "Month" ? "text-accent" : ""}`}
                variant="link"
                onClick={() => setFilter("Month")}
            >
                Month
            </Button>
            <Button
                className={`rounded-none ${filter === "Year" ? "text-accent" : ""}`}
                variant="link"
                onClick={() => setFilter("Year")}
            >
                Year
            </Button>
            <Button
                className={`rounded-none ${filter === "All Time" ? "text-accent" : ""}`}
                variant="link"
                onClick={() => setFilter("All Time")}
            >
                All Time
            </Button>
        </div>
    );
}
