// pages/edit-events.js
import { useState, useEffect } from 'react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { MobileTimePicker, MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const EditEvents = () => {
    const [events, setEvents] = useState([]);
    const [localValues, setLocalValues] = useState({});

    useEffect(() => {
        // Fetch all events on page load
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/get-events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                    initializeLocalValues(data.events);
                } else {
                    console.error('Failed to fetch events');
                }
            } catch (error) {
                console.error('Error during fetch', error);
            }
        };

        fetchEvents();
    }, []);

    const initializeLocalValues = (events) => {
        const initialValues = {};
        events.forEach((event) => {
            initialValues[event._id] = { ...event };
        });
        setLocalValues(initialValues);
    };

    const handleFieldChange = (productId, field) => (value) => {
        setLocalValues((prevLocalValues) => ({
            ...prevLocalValues,
            [productId]: {
                ...prevLocalValues[productId],
                [field]: field === 'date' ? value.format('YYYY-MM-DD') : value,
            },
        }));
    };

    const handleUpdateAll = async () => {
        try {
            const response = await fetch('/api/edit-events', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events: Object.values(localValues) }),
            });

            if (response.ok) {
                // Update successful, you can add any further actions
                console.log('Update successful');
            } else {
                // Handle error
                console.error('Failed to update events');
            }
        } catch (error) {
            console.error('Error during fetch', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                    <div item xs={16} sm={8} md={6} component={Paper} elevation={3} style={{margin:'3rem 0', padding:'3rem', width:'100vw'}}>
                        <div style={{ padding: '20px' }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Edit Events
                            </Typography>
                            {events.map((event) => (
                                <div key={event._id} style={{ marginBottom: '20px', border: '1px solid white', padding: '1rem', borderRadius:'1rem', background:'rgba(0,0,0,0.1)' }}>
                                    <Typography variant="subtitle1" gutterBottom style={{ textAlign: 'center' }}>
                                        {event.name.toUpperCase()}
                                    </Typography>
                                    <div style={{margin:'2rem 0', display:'block'}}>
                                        <MobileDatePicker

                                            label="Date"
                                            inputFormat="yyyy-MM-dd"
                                            value={localValues[event._id]?.date ? dayjs(localValues[event._id].date) : null}
                                            onChange={(date) => handleFieldChange(event._id, 'date')(date)}
                                            renderInput={(params) => <input {...params} style={{ width: '100%' }} />}

                                        />
                                    </div>
<div style={{display:'flex', flexDirection:'column'}}>

                                    <MobileTimePicker
                                        label="Time From"
                                        value={localValues[event._id]?.timeFrom || ''}
                                        onChange={(time) => handleFieldChange(event._id, 'timeFrom')(time)}
                                        renderInput={(params) => <input {...params} style={{ width: '100%' }} />}
                                    />

                                    <MobileTimePicker
                                        label="Time To"
                                        value={localValues[event._id]?.timeTo || ''}
                                        onChange={(time) => handleFieldChange(event._id, 'timeTo')(time)}
                                        renderInput={(params) => <input {...params} style={{ width: '90%' }} />}
                                    />
</div>

                                    <TextField
                                        type="text"
                                        value={localValues[event._id]?.category || ''}
                                        onChange={(e) => handleFieldChange(event._id, 'category')(e.target.value)}
                                        placeholder="Category"
                                        style={{ width: '100%', margin: '8px 0' }}
                                    />

                                    <TextField
                                        type="text"
                                        value={localValues[event._id]?.venue || ''}
                                        onChange={(e) => handleFieldChange(event._id, 'venue')(e.target.value)}
                                        placeholder="Venue"
                                        style={{ width: '100%', margin: '8px 0' }}
                                    />
                                </div>
                            ))}
                            <Button onClick={handleUpdateAll} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                                Update All
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default EditEvents;
