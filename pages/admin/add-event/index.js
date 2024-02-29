// pages/add-event.js
import { useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Typography,CircularProgress,Snackbar,Alert } from '@mui/material';
import { MobileTimePicker, MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const AddEvent = () => {

  const [adding, setAdding] = useState(false)
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
  });

  const handleChange = (field) => (e) => {
    setEventData({ ...eventData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true)
    try {
      const response = await fetch('/api/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {

        handleSnackbarOpen();
      } else {
        // Handle error
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error during fetch', error);
    }
    finally {
      setAdding(false)
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item xs={12} sm={10} md={8} component={Paper} elevation={4}>
            <form onSubmit={handleSubmit} style={{ padding: '20px', maxHeight: '100vh', marginTop: '5rem', marginBottom: '4rem' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Add Event
              </Typography>
              <TextField
                label="Event Name"
                variant="standard"
                fullWidth
                margin="normal"
                value={eventData.name}
                onChange={handleChange('name')}
                required

              />
              <TextField
                label="Category"
                variant="standard"
                fullWidth
                margin="normal"
                value={eventData.category}
                onChange={handleChange('category')}
                required

              />
              <MobileDatePicker
                label="Date"
                inputFormat="yyyy-MM-dd"
                value={eventData.date}
                onChange={(date) => setEventData({ ...eventData, date })}
                renderInput={(params) => <TextField {...params} variant="standard" fullWidth margin="normal" />}
                sx={{ margin: '2rem 0' }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MobileTimePicker
                    label="Time From"
                    value={eventData.timeFrom}
                    onChange={(time) => setEventData({ ...eventData, timeFrom: time })}
                    renderInput={(params) => <TextField {...params} variant="standard" fullWidth margin="normal" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MobileTimePicker
                    label="Time To"
                    value={eventData.timeTo}
                    onChange={(time) => setEventData({ ...eventData, timeTo: time })}
                    renderInput={(params) => <TextField {...params} variant="standard" fullWidth margin="normal" />}

                  />
                </Grid>
              </Grid>
              <TextField
                label="Venue"
                variant="standard"
                fullWidth
                margin="normal"
                value={eventData.venue}
                onChange={handleChange('venue')}
                required
              />
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center',  }}>

                <button type="submit" style={{ marginTop: '3rem', padding: '0.6rem 1rem', borderRadius: '0.7rem', width: "70%", cursor:'pointer' }}>
                  {adding ? (
                    <CircularProgress size={25} style={{ fontWeight: '900' }}  color="inherit" />
                  ) : (
                    'Add Event'
                  )}
                </button>
              </div>
            </form>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={handleSnackbarClose}
        >
          <Alert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
          >
            Event added successfully!
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default AddEvent;
