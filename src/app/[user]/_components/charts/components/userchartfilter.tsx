import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface UserChartFilterProps {
    filter: string;
    setFilter: (filter: string) => void;
}

export function UserChartFilter({ filter, setFilter }: UserChartFilterProps) {
    return (
        <div className="flex space-x-6 bg-secondary p-6">
            <Filter label="1M" filter={filter} setFilter={setFilter} />
            <Filter label="3M" filter={filter} setFilter={setFilter} />
            <Filter label="YTD" filter={filter} setFilter={setFilter} />
            <Filter label="1Y" filter={filter} setFilter={setFilter} />
            <Filter label="ALL" filter={filter} setFilter={setFilter} />
        </div>
    );
}

interface FilterProps extends UserChartFilterProps {
    label: string;
}

const Filter = ({ label, filter, setFilter }: FilterProps) => {
    return (
        <Label
            className={`rounded-none ${filter === label ? "text-accent underline underline-offset-4" : ""}`}
            onClick={() => setFilter(label)}
        >
            {label}
        </Label>
    );
};
