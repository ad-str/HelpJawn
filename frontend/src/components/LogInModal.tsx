import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

interface FormData {
    username: string;
    password: string;
}

interface LogInModalProps {
    handleLogIn: (username: string, password: string ) => Promise<void>;
}

export const LogInModal: React.FC<LogInModalProps> = ({handleLogIn}) => {

    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={formData.username} onChange={handleInputChange} type="username" placeholder="Enter username" />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => handleLogIn(formData.username, formData.password)}>Log In</Button>
            </Modal.Footer>
        </>
    )
};