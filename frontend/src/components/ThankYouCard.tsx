import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

interface ThankYouCardProps {
    message: string;
    event: number;
}

export const ThankYouCard: React.FC<ThankYouCardProps> = ({ message, event }) => {

    const [eventName, setEventName] = useState<string>('');

    useEffect(() => {
        try {
            fetch(`${API_URL}/event/${event}/`)
                .then(response => response.json())
                .then(data => {
                    setEventName(data.name);
                })
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <div className='bg-light d-flex align-items-start p-3'>
            {/* Icon container */}
            <div className='me-3'>
                <i className="bi bi-person-circle" style={{ fontSize: '2rem' }}></i>
            </div>

            {/* Text container */}
            <div className='d-flex flex-column'>
                <p className='mb-1'>{message}</p> {/* Message */}
                <small className='text-muted'>{`From ${eventName}`}</small> {/* Subtext for event */}
            </div>
        </div>
    );
}