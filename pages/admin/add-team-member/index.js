import { useState, useEffect } from 'react';
import { Button, Snackbar, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddTeamMember = () => {
    const [formData, setFormData] = useState({
        NAME: '',
        Department: '',
        Position: '',
        PhoneNumber: '',
        ImageExtension: '',
        updatedImageUrl: '',
    });

    const [uniquePositions] = useState(["Associate Head", "Head", "Management"]);
    const [uniqueDepartments] = useState([
        "Content", "Design", "Events", "Hospitality", "Joint Secretary",
        "Logistics", "Marketing", "Photography", "Public Relations", "Publicity",
        "Security", "Social Media", "Web Development"
    ]);

    const [loading, setLoading] = useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (formData.PhoneNumber && formData.ImageExtension) {
            const updatedImageUrl = `IMG_${formData.PhoneNumber}.${formData.ImageExtension}`;
            setFormData((prevFormData) => ({ ...prevFormData, updatedImageUrl }));
        }
    }, [formData.PhoneNumber, formData.ImageExtension]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const response = await fetch('/api/add-team-member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log(responseData); // You can handle success messages here

            setSuccessSnackbarOpen(true);
            setFormData({
                NAME: '',
                Department: '',
                Position: '',
                PhoneNumber: '',
                ImageExtension: '',
                updatedImageUrl: '',
            });
        } catch (error) {
            console.error('Error adding team member:', error);
            // Handle error messages
        } finally {
            setLoading(false);
        }
    };


    const handleSnackbarClose = () => {
        setSuccessSnackbarOpen(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', }}>
            <h1>Add Team Member</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <TextField
                    label="Name"
                    type="text"
                    name="NAME"
                    value={formData.NAME}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Department</InputLabel>
                    <Select
                        name="Department"
                        value={formData.Department}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="" disabled>Select Department</MenuItem>
                        {uniqueDepartments.map((department) => (
                            <MenuItem key={department} value={department}>{department}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Position</InputLabel>
                    <Select
                        name="Position"
                        value={formData.Position}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="" disabled>Select Position</MenuItem>
                        {uniquePositions.map((position) => (
                            <MenuItem key={position} value={position}>{position}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Phone Number"
                    type="text"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Image Extension</InputLabel>
                    <Select
                        name="ImageExtension"
                        value={formData.ImageExtension}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="" disabled>Select Extension</MenuItem>
                        <MenuItem value="jpg">jpg</MenuItem>
                        <MenuItem value="jpeg">jpeg</MenuItem>
                        <MenuItem value="png">png</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Image URL"
                    type="text"
                    name="updatedImageUrl"
                    value={formData.updatedImageUrl}
                    onChange={handleChange}
                    disabled
                    fullWidth
                    margin="normal"
                />
               {formData.updatedImageUrl &&  <h2 style={{ fontSize: '1.4rem', color: 'skyblue' }}>Make sure to save the image in public/local_images/imagestsc with this name: <span style={{ color: 'yellow' }}>{formData.updatedImageUrl}</span></h2>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        style={{ margin: '20px auto' }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Team Member'}
                    </Button>

                </div>
            </form>
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Team member added successfully!
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default AddTeamMember;
