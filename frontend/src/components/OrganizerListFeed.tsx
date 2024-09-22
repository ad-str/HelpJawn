import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    startTime: string;
    endTime: string;
    serviceType: string;
}

export const OrganizerListFeed: React.FC = () => {

    const [modal, setModal] = useState<boolean>(false);
    const show = () => setModal(true);
    const hide = () => setModal(false);

    const [events, setEvents] = useState<Event[]>([]);
    const [serviceTypes, setServiceTypes] = useState<string[]>([]);

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
        } catch (error) {
            console.error('Failed to fetch')
        }
    }) 

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
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.title}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                            <td>{event.startTime}</td>
                            <td>{event.endTime}</td>
                            <td><a className="hover"><i className="bi bi-x"></i></a></td>
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
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter date" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter time" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter time" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter location" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formServiceType">
                            <Form.Label>Service Type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Select Service Type</option>
                               {serviceTypes.map((serviceType, index) => (
                                   <option key={index + 1}>{serviceType}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}