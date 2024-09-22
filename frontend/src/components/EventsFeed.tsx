import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EventCard } from './EventCard';
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface Event {
    name: string;
    description: string;
    date: string;
    location: string;
    image: string;  // Add this field for the image path
}

interface EventsFeedProps {
    user_type: string;
}

export const EventsFeed: React.FC<EventsFeedProps> = ({user_type}) => {

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/events/`)
            .then(response => response.json())
            .then(data => {
                // Assuming each event has a unique index or identifier
                const eventsWithImages = data.map((event: Event, index: number) => ({
                    ...event,
                    image: `/images/event${index + 1}.jpg`  // Assign a local image path
                }));
                setEvents(eventsWithImages);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="d-flex">
            <Container>
                <Row className="justify-content-start">
                {events.map((event, index) => (
    <Col key={index} xs={12} sm={12} md={6} lg={4} className="mb-4">
        <EventCard 
          title={event.name} 
          description={event.description} 
          date={event.date} 
          location={event.location} 
          user_type={user_type} 
          image={event.image}  // Pass the image here
        />
    </Col>
))}
                </Row>
            </Container>
        </div>
    );
}
