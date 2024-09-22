import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface VolunteerSignUpModalProps {
    handleVolunteerSignUp: () => Promise<void>;
}

export const VolunteerSignUpModal: React.FC<VolunteerSignUpModalProps> = ({handleVolunteerSignUp}) => {
    return (
        <Modal.Header closeButton>
            <Modal.Title>Volunteer</Modal.Title>
            <Modal.Body>Click the Okay button to complete signing up</Modal.Body>
            <Modal.Footer>
                <Button variant="Success" onClick={handleVolunteerSignUp}>Okay</Button>
            </Modal.Footer>
        </Modal.Header>
    )
}