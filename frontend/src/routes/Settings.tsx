import React, { useEffect, useState } from "react";
import { User } from "../App";
import { Form, Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

interface SettingsProps {
    user: User;
    user_type: string;
}

interface VolunteerFormData {
    location: string;
    bio: string;
}

interface OrganizationFormData {
    name: string;
    city: string;
    address: string;
    phone: string;
    email: string;
}

export const Settings: React.FC<SettingsProps> = ({ user, user_type }) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [orgName, setOrgName] = useState("");
    const [orgCity, setOrgCity] = useState("");
    const [orgAddress, setOrgAddress] = useState("");
    const [orgPhone, setOrgPhone] = useState("");
    const [orgEmail, setOrgEmail] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/update_profile/${user.id}/`)
            .then((response) => response.json())
            .then((data) => {
                if (user_type === "volunteer") {
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setLocation(data.location);
                    setBio(data.bio);
                } else if (user_type === "organization") {
                    setOrgName(data.name);
                    setOrgCity(data.city);
                    setOrgAddress(data.address);
                    setOrgPhone(data.phone);
                    setOrgEmail(data.email);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = `${API_URL}/update_profile/${user.id}/`;
        const method = 'PATCH';
        const headers = { 'Content-Type': 'application/json' };

        const body = user_type === "volunteer" ? JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            location: location,
            bio: bio
        }) : JSON.stringify({
            name: orgName,
            city: orgCity,
            address: orgAddress,
            phone: orgPhone,
            email: orgEmail
        });

        fetch(url, { method, headers, body })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src="/images/flower.jpg"
                    alt="Profile Picture"
                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px', objectFit: 'cover' }}
                />

                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Account Type: {user_type}</p>
                </div>
            </div>

            <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {user_type !== "organization" &&
                    <>
                        <Form.Group controlId="formBasicFirstName" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>
                    </>
                }

                {user_type === "volunteer" &&
                    <>
                        <Form.Group controlId="formBasicLocation" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicBio" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="Tell us about yourself"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                style={{ width: '200%' }}
                            />
                        </Form.Group>
                    </>
                }

                {user_type === "organization" &&
                    <>
                        <Form.Group controlId="formOrgName" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Organization Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your organization name"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                value={orgCity}
                                onChange={(e) => setOrgCity(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                value={orgAddress}
                                onChange={(e) => setOrgAddress(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formOrgNumber" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={orgPhone}
                                onChange={(e) => setOrgPhone(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formOrgEmail" style={{ width: '300px', textAlign: 'left' }}>
                            <Form.Label>Organization Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your organization's email"
                                value={orgEmail}
                                onChange={(e) => setOrgEmail(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>
                    </>
                }

                <Button variant="Success" type="submit" style={{ marginTop: '20px' }}>
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};
