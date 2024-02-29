import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import styles from './compstyles/admin.module.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TypeAdminPassword = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Fetch login flag from API
            const flagResponse = await fetch('/api/get-login-flag');
            const flagData = await flagResponse.json();

            const response = await fetch('/api/validate-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Update to use the login flag from API response
                localStorage.setItem('loginFlag', flagData.loginFlag);
                console.log('logged in successfully');
                onLogin();
            } else {
                setErrorMessage('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error validating password:', error);
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ padding: '2rem', width: '100vw', height: '100vh' }}>
            <div className={styles.technika} style={{ margin: '0' }}>Technika HBTU</div>
            <div className={styles.adminPanel} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginTop: '3rem', marginBottom: '4rem' }}>
                <h1 className={styles.heading}>Greetings, Admin</h1>
                <p className={styles.description}>Login To Continue</p>
                <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '4rem',
                    width: '30%',
                    minWidth: '215px',
                }}
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {errorMessage && <p>{errorMessage}</p>}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: '2rem', width: '90%', backgroundColor: 'white', color: 'black' }}
                >
                    Submit
                </Button>
            </form>
 
            </div>

        </div>
    );
};

export default TypeAdminPassword;
