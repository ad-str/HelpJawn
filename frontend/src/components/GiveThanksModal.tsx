import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import './GiveThanksModal.css';

interface GiveThanksModalProps {
    handleGiveThanks: (message: string) => Promise<void>;
}

export const GiveThanksModal: React.FC<GiveThanksModalProps> = ({handleGiveThanks}) => {

    const [message, setMessage] = useState<string>('');
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    return (
        <Modal.Header closeButton>
            {/* <Modal.Title></Modal.Title> */}
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="message">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control as="textarea" value={message} onChange={handleMessageChange} placeholder="Send a message about how this event impacted you!" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-custom' onClick={() => handleGiveThanks(message)}>Send</Button>
            </Modal.Footer>
        </Modal.Header>
    )
}