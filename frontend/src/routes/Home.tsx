import "bootstrap/dist/css/bootstrap.min.css";
import { OrganizerListFeed } from "../components/OrganizerListFeed";
import { EventsFeed } from "../components/EventsFeed";

interface HomeProps {
    accountType: string | undefined;
}

export const Home: React.FC<HomeProps> = ({ accountType }) => {
    return (
        <>
            {accountType === "organizer" ? <OrganizerListFeed /> : <EventsFeed />}
        </>
    )
}