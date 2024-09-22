import React from "react"
import { User } from "../App"

interface SettingsProps {
    user: User;
    type: string;
}

export const Settings: React.FC<SettingsProps> = ({user, type}) => {
    return (
        <div>
            <h1>Settings</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Account Type: {type}</p>
        </div>
    )
}