import { TopNav } from "../_components/topnav";
import { UserProfile } from "./_components/userprofile";

export const dynamic = "force-dynamic";

interface Params {
    params: {
        user: string;
    };
}

export default function UserPage({ params }: Params) {
    const { user: username } = params;

    return (
        <div>
            <TopNav title={username} />
            <UserProfile username={username} />
        </div>
    );
}
