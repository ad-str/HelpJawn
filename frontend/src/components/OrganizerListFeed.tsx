import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    imageLink: string;
}

export const OrganizerListFeed: React.FC = () => {

    const [modal, setModal] = useState<boolean>(false);
    const show = () => setModal(true);
    const hide = () => setModal(false);

    // const [events, setEvents] = useState<Event[]>([]);

    const [mockEvents, setMockEvents] = useState<Event[]>([
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
    ]);

    // INSERT USE EFFECT TO PULL EVENTS FROM BACKEND

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div> {/* Empty div to push the button to the right */}
                <Button onClick={show}>Add</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {mockEvents.map((event, index) => (
                        <tr key={index}>
                            <td>{event.title}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
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
                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter location" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImageLink">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" placeholder="Enter image link" />
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