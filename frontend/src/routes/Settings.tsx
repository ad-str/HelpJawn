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
    name: string;
    city: string
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

    const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgName(e.target.value);
    };

    const handleOrgCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgCity(e.target.value);
    };

    const handleOrgAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgAddress(e.target.value);
    };

    const handleOrgPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgPhone(e.target.value);
    };

    const handleOrgEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user_type === "volunteer") {
            fetch(`${API_URL}/update_profile/${user.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    location: location,
                    bio: bio
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        } else {
            fetch(`${API_URL}/update_profile/${user.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: orgName,
                    city: orgCity,
                    address: orgAddress,
                    phone: orgPhone,
                    email: orgEmail
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    };

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

    return (
        <div>
            <h1>Settings</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Account Type: {user_type}</p>

            <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {user_type !== "organization" &&
                    <>
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
                    </>
                }

                {user_type === "volunteer" &&
                    <>
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
                    </>
                }
                {user_type === "organization" &&
                    <>
                        <Form.Group controlId="formOrgName" style={{ width: '300px', textAlign: 'center' }}>
                            <Form.Label>Update Organization Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your organization name"
                                value={orgName}
                                onChange={handleOrgNameChange}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity" style={{ width: '300px', textAlign: 'center' }}>
                            <Form.Label>Update City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                value={orgCity}
                                onChange={handleOrgCityChange}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress" style={{ width: '300px', textAlign: 'center' }}>
                            <Form.Label>Update Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                value={orgAddress}
                                onChange={handleOrgAddressChange}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formOrgNumber" style={{ width: '300px', textAlign: 'center' }}>
                            <Form.Label>Update Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={orgPhone}
                                onChange={handleOrgPhoneChange}
                                style={{ width: '100%' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formOrgEmail" style={{ width: '300px', textAlign: 'center' }}>
                            <Form.Label>Update organization e-mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your organization's email"
                                value={orgEmail}
                                onChange={handleOrgEmailChange}
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
