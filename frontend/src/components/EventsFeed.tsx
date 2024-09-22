import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EventCard } from './EventCard';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { VolunteerSignUpModal } from './VolunteerSignUpModal';
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
}

interface EventsFeedProps {
    user_type: string;
    userId: number
}

export const EventsFeed: React.FC<EventsFeedProps> = ({user_type, userId}) => {

    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const show = () => setShowModal(true);
    const hide = () => setShowModal(false);
    const [selectedEvent, setSelectedEvent] = useState<number>();

    useEffect(() => {
        fetch(`${API_URL}/events/`)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.log(error));
    }, []);

    const setEvent = (id: number) => {
        setSelectedEvent(id);
    }

    const handleSignUpVolunteer = async () => {
        try {
            fetch(`${API_URL}/event-signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({event_id: selectedEvent, user_id: userId})
            })
            .then(response => {
                if (response.ok) {
                    console.log("Response is okay");
                    hide();
                } else {
                    throw new Error('Failed to sign up for event');
                }
            })
            .then(data => console.log(data))
        } catch (error) {
            console.error('Failed to sign up for event');
        }
    }

    const handleSayThanks = async () => {

    }

    return (
        <div className="d-flex">
            <Container>
                <Row className="justify-content-start">
                    {events.map((event, index) => (
                        <Col key={index} xs={12} sm={12} md={6} lg={4} className="mb-4">
                            <EventCard title={event.name} description={event.description} date={event.date} location={event.location} user_type={user_type} show={show} setSelectedEvent={setEvent} id={event.id}/>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal} onHide={hide}>
                    {user_type === "volunteer" && <VolunteerSignUpModal handleVolunteerSignUp={handleSignUpVolunteer} />}
            </Modal>
        </div>
    )
}