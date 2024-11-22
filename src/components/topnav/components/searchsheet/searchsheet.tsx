import type { User } from "@clerk/nextjs/server";
import SearchSheetClient from "./searchsheetclient";

interface SearchSheetProps {
    users: User[];
}

export async function SearchSheet({ users }: SearchSheetProps) {
    const plainUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
        fullname: user.fullName,
        image: user.imageUrl,
    }));

    return <SearchSheetClient users={plainUsers} />;
}
