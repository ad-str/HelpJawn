import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './EventCard.css';  // Import a CSS file for custom styling

interface EventCardProps {
    title: string;
    isSignedUp: boolean;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    user_type: string;
    image: string;
    show: () => void;  // Corrected function declaration
    setSelectedEvent: (id: number) => void;
    id: number;
}

export const EventCard: React.FC<EventCardProps> = ({
    title, isSignedUp, description, date, start_time, end_time, location, user_type, setSelectedEvent, id, image, show
}) => {
    const [showModal, setShowModal] = useState(false);  // State to manage modal visibility

    const handleOpenModal = () => setShowModal(true);  // Open modal
    const handleCloseModal = () => setShowModal(false);  // Close modal

    // Combine date and time into full date-time strings
    const startDateTime = new Date(`${date} ${start_time}`);
    const endDateTime = new Date(`${date} ${end_time}`);

    // Format the time as "2:00 pm"
    const formattedStartTime = startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    const formattedEndTime = endDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <>
            {/* The Event Card */}
            <Card className='event-card mx-auto h-100'>
                <Card.Img variant="top" className='event-card-img' src={image} alt={title} />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className='truncate' style={{ fontWeight: 'normal' }}>
                        {description.substring(0, 100)}...  {/* Show a preview of the description */}
                    </Card.Text>
                    <Card.Text className='event-timing'>
                        <strong>When:</strong> {date} {formattedStartTime} - {formattedEndTime}
                    </Card.Text>
                    <Card.Text>
                        <strong>Location:</strong> {location}
                    </Card.Text>

                    {/* Flexbox to place the "More Info" and "Impact" buttons on opposite sides */}
                    <div>
                        <Button variant="secondary" style={{ position: 'absolute', bottom: '15px', left: '15px' }} onClick={handleOpenModal}>More Info</Button>  {/* Left-aligned button */}
                        <Button onClick={() => {
                            show();  // Call the show function passed from the parent component
                            setSelectedEvent(id);
                        }} className='button-custom' disabled={isSignedUp}>
                            {user_type === "volunteer" ? (isSignedUp ? "✅" : "Sign Up") : "+Impact"}  {/* Right-aligned button */}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {/* The Popup Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={image} alt={title} style={{ width: '100%', marginBottom: '10px' }} />
                    <p><b>Description:</b> {description}</p>
                    <p><b>Date:</b> {date}</p>
                    <p><b>Location:</b> {location}</p>
                    <p><b>Start Time:</b> {formattedStartTime}</p>
                    <p><b>End Time:</b> {formattedEndTime}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventCard;
