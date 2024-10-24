import { clerkClient } from "@clerk/nextjs/server";
import SearchSheetClient from "./searchsheetclient";

export async function SearchSheet() {
    const response = await clerkClient().users.getUserList();
    const users = response.data;

    const plainUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
    }));

    return <SearchSheetClient users={plainUsers} />;
}
