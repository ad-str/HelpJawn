import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EventCard } from './EventCard';

export const EventsFeed: React.FC = () => {

    const events = [
        {
            title: "Event 1",
            description: "This is the first event",
            date: "2021-10-10",
            location: "Location 1",
            imageLink: "https://via.placeholder.com/150"
        },
        {
            title: "Event 2",
            description: "This is the second event",
            date: "2021-10-11",
            location: "Location 2",
            imageLink: "https://via.placeholder.com/150"
        },
        {
            title: "Event 3",
            description: "This is the third event",
            date: "2021-10-12",
            location: "Location 3",
            imageLink: "https://via.placeholder.com/150"
        },
        {
            title: "Event 4",
            description: "This is the fourth event",
            date: "2021-10-13",
            location: "Location 4",
            imageLink: "https://via.placeholder.com/150"
        }
    ]

    return (
        <div className="d-flex">
            <Container>
                <Row className="justify-content-start">
                    {events.map((event, index) => (
                        <Col key={index} xs={12} sm={12} md={6} lg={4} className="mb-4">
                            <EventCard title={event.title} description={event.description} date={event.date} location={event.location} imageLink={event.imageLink} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}