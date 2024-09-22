import React, { useEffect, useState } from "react";
import { User } from "../App";
import { Form, Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

interface SettingsProps {
    user: User;
    user_type: string; // Keep this as is
}

interface VolunteerFormData {
    location: string;
    bio: string;
}

interface OrganizationFormData {
    orgName: string;
    city: string
    address: string;
    phone: string;
    orgEmail: string;
}

export const Settings: React.FC<SettingsProps> = ({ user, user_type }) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");

    const [volunteerFormData, setVolunteerFormData] = useState<VolunteerFormData>();
    const [organizationFormData, setOrganizationFormData] = useState<OrganizationFormData>();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user_type === "volunteer") {
        } else {
            console.log("Profile update options are only available for volunteers.");
        }
    };

    useEffect(() => {
        if (user_type === "volunteer") {
            fetch(`${API_URL}/update-profile/`)
                .then((response) => response.json())
                .then((data) => {
                    setVolunteerFormData(data);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setLocation(data.location);
                    setBio(data.bio);
                })
                .catch((error) => console.log(error));
        } else if (user_type === "organization") {
            fetch(`${API_URL}/organizations/${user.id}/`)
                .then((response) => response.json())
                .then((data) => {
                    setOrganizationFormData(data);
                })
                .catch((error) => console.log(error));
        }   
    }, []);

    return (
        <div>
            <h1>Settings</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Account Type: {user_type}</p>

            {user_type === "volunteer" ? (
                <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Form.Group controlId="formBasicUsername" style={{ width: '300px', textAlign: 'center' }}>
                        <Form.Label>Update Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new username"
                            value={username}
                            onChange={handleUsernameChange}
                            style={{ width: '100%' }} 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicFirstName" style={{ width: '300px', textAlign: 'center' }}>
                        <Form.Label>Update First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            style={{ width: '100%' }} 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName" style={{ width: '300px', textAlign: 'center' }}>
                        <Form.Label>Update Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            style={{ width: '100%' }} 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicLocation" style={{ width: '300px', textAlign: 'center' }}>
                        <Form.Label>Update Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your location"
                            value={location}
                            onChange={handleLocationChange}
                            style={{ width: '100%' }} 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicBio" style={{ width: '300px', textAlign: 'center' }}>
                        <Form.Label>Update Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself"
                            value={bio}
                            onChange={handleBioChange}
                            style={{ width: '100%' }} 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
                        Save Changes
                    </Button>
                </Form>
            ) : (
                <p>Profile update options are not available for your account type.</p>
            )}
        </div>
    );
};
