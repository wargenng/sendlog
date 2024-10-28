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
            <UserProfile username={username} />
        </div>
    );
}
