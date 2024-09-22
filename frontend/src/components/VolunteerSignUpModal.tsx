import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface VolunteerSignUpModalProps {
    handleVolunteerSignUp: () => Promise<void>;
}

export const VolunteerSignUpModal: React.FC<VolunteerSignUpModalProps> = ({handleVolunteerSignUp}) => {
    return (
        <Modal.Header closeButton>
            <Modal.Title>Volunteer</Modal.Title>
            <Modal.Body>Click the Confirm button to complete signing up</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleVolunteerSignUp}>Confirm!</Button>
            </Modal.Footer>
        </Modal.Header>
    )
}