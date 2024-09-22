import React, { useEffect } from 'react';
import { ThankYouCard } from '../components/ThankYouCard';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

interface ImportProps {
    user_id: number;
}

interface MessageData {
    note: string;
    event: number;
}

export const Impact: React.FC<ImportProps> = ({user_id}) => {

    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/volunteer-impact/${user_id}/`)
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
            });
    }, []);

    return (
        <>
            <h1>See your impact</h1>
            {messages.map((message: MessageData, index: number) => (
                <ThankYouCard key={index} event={message.event} message={message.note} />
            ))}
        </>
    )
}