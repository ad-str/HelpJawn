import "bootstrap/dist/css/bootstrap.min.css";
import { OrganizerListFeed } from "../components/OrganizerListFeed";
import { EventsFeed } from "../components/EventsFeed";

interface HomeProps {
    accountType: string | undefined;
    userId: number | undefined;
}

export const Home: React.FC<HomeProps> = ({ accountType, userId }) => {
    return (
        <>
            {accountType === "organization" ? <OrganizerListFeed organizationId={userId === undefined ? 0 : userId} /> : <EventsFeed user_type={accountType!} />}
        </>
    )
}