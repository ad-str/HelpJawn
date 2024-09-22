import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrganizerListFeed } from "../components/OrganizerListFeed";
import { EventsFeed } from "../components/EventsFeed";
import { Modal } from "react-bootstrap";
import { VolunteerSignUpModal } from "../components/VolunteerSignUpModal";

interface HomeProps {
    accountType: string | undefined;
    userId: number | undefined;
}

export const Home: React.FC<HomeProps> = ({ accountType, userId }) => {
    return (
        <>
            {accountType === "organization" ? <OrganizerListFeed organizationId={userId === undefined ? 0 : userId} /> : <EventsFeed userId={userId!} user_type={accountType!} />}
        </>
    )
}