import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

interface ThankYouCardProps {
    message: string;
    event: number;
}

export const ThankYouCard: React.FC<ThankYouCardProps> = ({message, event}) => {

    const [eventName, setEventName] = useState<string>('');

    useEffect(() => {
        
    })

    return (
        <div className='bg-light d-flex align-items-center'>
            <div>
                <i className="bi bi-person-circle"></i>
                <text></text>
            </div>
            <div className=''>
                <p>{message}</p>
                <p>{`From ${eventName}`}</p>
            </div>
        </div>
    );
}