// pages/index.js
import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField, Container, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './eventdetails.module.css'; // Import the CSS module

const IndexPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const linkPath = (id) => {
        return `/admin/add-event-details/${encodeURIComponent(id)}`;
    };

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const res = await fetch('/api/get-events');
            const data = await res.json();
            setEvents(data.events);
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <h2 className={styles.heading}>Choose an event to Add Details of</h2>
                {events.map((event) => (
                    <Link className={styles.eventLink} href={linkPath(event._id)} key={event._id} passHref>
                        {event.name.toUpperCase()}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default IndexPage;
