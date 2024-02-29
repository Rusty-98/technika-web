// pages/delete-event.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events data from your API
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/get-events'); // Update with your actual API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                } else {
                    console.error('Failed to fetch events');
                }
            } catch (error) {
                console.error('Error during fetch', error);
            }
        };

        fetchEvents();
    }, [events]);

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch(`/api/delete-event/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Event deleted successfully, update the state or handle accordingly
                console.log('Event deleted successfully');
                // Refresh events after deletion

            } else {
                // Handle error
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error during fetch', error);
        }
    };

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={3}>
                    <div style={{ padding: '20px' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Delete Events
                        </Typography>
                        <div >
                            {events.map((event) => (
                                <div key={event._id} style={{ backgroundColor: 'white', margin: '2rem', padding: '1rem', color: 'black', fontWeight: '900', fontFamily: 'Krona One' }}>
                                    <div style={{ display: 'flex', justifyContent:'space-around', cursor:'pointer' }}>
                                        <Typography variant="subtitle1" gutterBottom style={{ fontWeight: '900', fontFamily: 'Krona One' }}>
                                            {event.name.toUpperCase()}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteEvent(event._id)}
                                        >
                                            Delete
                                        </Button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DeleteEvent;
