// pages/add-event/[eventname].js
import { useState, useEffect } from 'react';
import { TextField, CircularProgress, Snackbar, Alert, TextareaAutosize } from '@mui/material';
import { useRouter } from 'next/router';

const AddEvent = () => {
  const router = useRouter();
  const { eventname } = router.query;
  const [adding, setAdding] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const [eventData, setEventData] = useState({
    name: '',
    category: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    venue: '',
    about: '',
    guidelines: [''], // At least one guideline input by default
    eventid: '',
  });

  useEffect(() => {
    const fetchEventInfo = async () => {
      if (eventname) {
        console.log(eventname)
        try {
          const response = await fetch(`/api/get-event-info-id/${eventname}`);
          if (response.ok) {
            const data = await response.json();
            const { event } = data;
            if (event) {
              // Pre-fill certain fields from the fetched event data
              setEventData({
                ...eventData,
                name: event.name || '',
                category: event.category || '',
                date: event.date || '',
                timeFrom: event.timeFrom || '',
                timeTo: event.timeTo || '',
                venue: event.venue || '',
                eventid: eventname,
              });
            }
          } else {
            console.error('Failed to fetch event info');
          }
        } catch (error) {
          console.error('Error during fetch', error);
        }
      }
    };

    fetchEventInfo();
  }, [eventname]);

  const handleChange = (field) => (e) => {
    setEventData({ ...eventData, [field]: e.target.value });
  };

  const handleAddGuideline = () => {
    setEventData({
      ...eventData,
      guidelines: [...eventData.guidelines, ''],
    });
  };

  const handleGuidelineChange = (index) => (e) => {
    const newGuidelines = [...eventData.guidelines];
    newGuidelines[index] = e.target.value;
    setEventData({
      ...eventData,
      guidelines: newGuidelines,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAdding(true);

    // Remove empty guidelines
    const nonEmptyGuidelines = eventData.guidelines.filter((guideline) => guideline.trim() !== '');
    const updatedEventData = {
      ...eventData,
      guidelines: nonEmptyGuidelines,
    };

    try {
      const response = await fetch(`/api/add-eventdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEventData),
      });
      if (response.ok) {
        handleSnackbarOpen();
      } else {
        // Handle error
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error during fetch', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ padding: '20px', maxHeight: '100vh', margin: ' 4rem 1rem' }}>
          <TextField
            label="Guidelines"
            variant="standard"
            fullWidth
            margin="normal"
            value={eventData.guidelines[0]}
            onChange={handleGuidelineChange(0)}
            required
          />
          {eventData.guidelines.slice(1).map((guideline, index) => (
            <TextField
              key={index + 1}
              label={`Guideline ${index + 2}`}
              variant="standard"
              fullWidth
              margin="normal"
              value={guideline}
              onChange={handleGuidelineChange(index + 1)}
              required
            />
          ))}
          <button type="button" style={{ padding: '0.6rem 1rem', fontSize: '1rem', borderRadius: '0.6rem', cursor: 'pointer' }} onClick={handleAddGuideline}>
            Add one more guideline
          </button>
          <h4 style={{ marginBottom: '-1.3rem' }}>About The Event</h4>
          <TextareaAutosize
            label="About"
            minRows={4}
            placeholder="Enter event details..."
            value={eventData.about}
            onChange={handleChange('about')}
            required

            style={{ width: '100%', marginBottom: '1rem', outline: 'none', fontSize: '1rem', marginTop: '2rem', borderRadius: '1rem', padding: '0.6rem 1rem', fontFamily: 'Jost' }}
          />

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button type="submit" style={{ marginTop: '3rem', padding: '1rem', borderRadius: '0.7rem', width: '40%', cursor: 'pointer', fontWeight: '700' }}>
              {adding ? <CircularProgress size={25} style={{ fontWeight: '900' }} color="inherit" /> : 'Add Details'}
            </button>
          </div>
        </form>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            Event Details added successfully!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default AddEvent;
