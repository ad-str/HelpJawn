import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MouseEvent, useState } from 'react';
import {User} from '../App';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface SignUpModalProps {
    setUser: (user: User) => void;
}

interface FormData {
    username: string;
    email: string;
    password: string;
    user_type: string;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({setUser}) => {

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        user_type: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name);
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleAccountTypeChange = (e: MouseEvent<HTMLElement>) => {
        console.log(e.target);
        const { id } = e.target as HTMLInputElement;
        const user_type = id === 'inline-radio-1' ? 'client' : id === 'inline-radio-2' ? 'volunteer' : 'organization';
        setFormData((prevData) => ({
          ...prevData,
          user_type,
        }));
    }

    const handleSignUpSubmit = async () => {
        console.log(formData);
        try {
            const response = await fetch(`${API_URL}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log("Response is okay");
                const data: User = await response.json();
                console.log(data);
                setUser(data);
            } else {
                console.error('Sign Up failed');
                throw new Error('Sign Up failed');
            }
        } catch (error) {
            console.error('Sign Up failed');
        }
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Enter username" value={formData.username} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAccountType">
                        <Form.Label>Account Type</Form.Label>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Client"
                                name="accountType"
                                type="radio"
                                id="inline-radio-1"
                                onClick={handleAccountTypeChange}
                            />
                            <Form.Check
                                inline
                                label="Volunteer"
                                name="accountType"
                                type="radio"
                                id="inline-radio-2"
                                onClick={handleAccountTypeChange}
                            />
                            <Form.Check
                                inline
                                label="Organization"
                                name="accountType"
                                type="radio"
                                id="inline-radio-3"
                                onClick={handleAccountTypeChange}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSignUpSubmit}>Sign Up</Button>
            </Modal.Footer>
        </>
    )
}