import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MouseEvent, useState } from 'react';


export const SignUpModal: React.FC = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        accountType: '',
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
        const { id } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
          ...prevData,
          accountType: id,
        }));
    }

    const handleSignUpSubmit = (): void => { 
        console.log(formData);
        setFormData({
            username: '',
            email: '',
            password: '',
            accountType: '',
        });
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
                                label="Beneficiary"
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
                            />
                            <Form.Check
                                inline
                                label="Organization"
                                name="accountType"
                                type="radio"
                                id="inline-radio-3"
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