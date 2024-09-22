import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EventCard } from './EventCard';
import { useState, useEffect } from 'react';

import { VolunteerSignUpModal } from './VolunteerSignUpModal';
import { GiveThanksModal } from './GiveThanksModal';
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
import { Card, Button, Modal } from 'react-bootstrap';

interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    image: string;  
    
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
    const [signedUpEvents, setSignedUpEvents] = useState<number[]>([]);

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

        // Fetch signed-up events for the user
        fetch(`${API_URL}/registered-events/${userId}`)
            .then(response => response.json())
            .then(data => {
                setSignedUpEvents(data.map((event: Event) => event.id)); // Assuming the response contains the signed-up events
            })
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
                    setSignedUpEvents((prev) => [...prev, selectedEvent!]);
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

    const handleSayThanks = async (message: string) => {
        try {
            fetch(`${API_URL}/impact-notes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({note: message ,event: selectedEvent, client: userId})
            })
            .then(response => {
                if (response.ok) {
                    console.log("Response is okay");
                    hide();
                } else {
                    throw new Error('Failed to say thanks');
                }
            })
            .then(data => console.log(data))
            hide();
        } catch (error) {
            console.error('Failed to say thanks');
        }
    }

    return (
        <div className="d-flex">
            <Container>
                <Row className="justify-content-start">
                    {events.map((event, index) => (
                        <Col key={index} xs={12} sm={12} md={6} lg={4} className="mb-4">
                            <EventCard title={event.name} description={event.description} date={event.date} start_time={event.start_time} end_time={event.end_time} location={event.location} user_type={user_type} show={show} setSelectedEvent={setEvent} id={event.id} image={event.image} isSignedUp={signedUpEvents.includes(event.id)}/>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal} onHide={hide}>
                    {user_type === "volunteer" && <VolunteerSignUpModal handleVolunteerSignUp={handleSignUpVolunteer} />}
                    {user_type !== "volunteer" && <GiveThanksModal handleGiveThanks={handleSayThanks} />}
            </Modal>
        </div>
    );
}
