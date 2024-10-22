import { getIsUserProfile } from "~/app/api/climbActions";
import { EditProfile } from "./editprofile";
import { Button } from "~/components/ui/button";

interface ProfileActionsProps {
    username: string;
}

export async function ProfileActions({ username }: ProfileActionsProps) {
    const isCurrectUser = await getIsUserProfile(username);

    return (
        <div className="space-y-2">
            {isCurrectUser ? (
                <EditProfile />
            ) : (
                <Button className="w-full text-foreground">Add Friend</Button>
            )}
            <Button variant="secondary" className="w-full">
                Share Profile
            </Button>
        </div>
    );
}
