import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface Event {
    name: string;
    description: string;
    date: string;
    location: string;
    start_time: string;
    end_time: string;
    serviceType: string;
}

interface EventForm {
    name: string;
    description: string;
    date: string;
    location: string;
    start_time: string;
    end_time: string;
    serviceType: string;
    organization: number;
}

interface OrganizerListFeedProps {
    organizationId: number;
}

export const OrganizerListFeed: React.FC<OrganizerListFeedProps> = ({organizationId}) => {

    const [modal, setModal] = useState<boolean>(false);
    const show = () => setModal(true);
    const hide = () => setModal(false);


    const [events, setEvents] = useState<Event[]>([]);
    const [eventForm, setEventForm] = useState<EventForm>({
        name: '',
        description: '',
        date: '',
        location: '',
        start_time: '',
        end_time: '',
        serviceType: '',
        organization: organizationId
    });
    const [serviceTypes, setServiceTypes] = useState<string[]>([]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setEventForm((prevData) => ({
            ...prevData,
            [id]: value
        }));
    }
    const handleDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setEventForm((prevData) => ({
            ...prevData,
            serviceType: value
        }));
    }

    const addEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/events/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventForm)
            });
            if (response.ok) {
                console.log("Response is okay");
                const data = await response.json();
                setEvents((prevEvents) => [...prevEvents, data]);
                hide();
            } else {
                console.error('Failed to add event');
                throw new Error('Failed to add event');
            }
        } catch (error) {
            console.error('Failed to add event');
        }
    }


    // INSERT USE EFFECT TO PULL EVENTS FROM BACKEND
    useEffect(() => {
        try {
            fetch(`${API_URL}/services/`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed to fetch')
            })
            .then(data => setServiceTypes(data))
            fetch(`${API_URL}/org-events/${organizationId}/`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed to fetch')
            })
            .then(data => setEvents(data))
        } catch (error) {
            console.error('Failed to fetch')
        }
    }, []) 

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div> {/* Empty div to push the button to the right */}
                <Button onClick={show}>Add</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Service Type</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                            <td>{event.start_time}</td>
                            <td>{event.end_time}</td>
                            <td>{event.serviceType}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={modal} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={eventForm.name} onChange={handleInputChange} type="text" placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={eventForm.description} onChange={handleInputChange} type="text" placeholder="Enter description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control value={eventForm.date} onChange={handleInputChange} type="date" placeholder="Enter date" />
                        </Form.Group>
                        <Form.Group controlId="start_time">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control value={eventForm.start_time} onChange={handleInputChange} type="time" placeholder="Enter time" />
                        </Form.Group>
                        <Form.Group controlId="end_time">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control value={eventForm.end_time} onChange={handleInputChange} type="time" placeholder="Enter time" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control value={eventForm.location} onChange={handleInputChange} type="text" placeholder="Enter location" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="serviceType">
                            <Form.Label>Service Type</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleDropDownChange}>
                                <option>Select Service Type</option>
                                {serviceTypes.map((serviceType, index) => (
                                    <option key={index + 1}>{serviceType}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addEvent} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}