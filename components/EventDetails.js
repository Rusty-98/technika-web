import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import styles from './compstyles/eventdetails.module.css';
import { Cancel } from '@mui/icons-material';
import Link from 'next/link';

const EventDetails = ({ display, name, category, date, timeFrom, timeTo, venue, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const capitalizedName = capitalizeFirstLetter(name);
    const linkPath = `/form/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;

    return (
        <Dialog
            open={display}
            fullWidth
            maxWidth="lg"
            onClose={handleClose}
            fullScreen={false}
            sx={{padding:'4rem'}}
            PaperComponent={({ children }) => (
                <Paper
                    sx={{
                        borderRadius: '1.25rem',
                        border: '3px solid rgba(255, 0, 214, 0.74)',
                        background: 'rgba(255, 255, 255, 0.09)',
                        position: 'relative',
                    }}
                    className={styles.dialog}
                >
                    {children}
                </Paper>
            )}
        >
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'rgba(255, 0, 214, 0.74)', cursor: 'pointer', zIndex: '99999' }} onClick={handleClose} >
                <Cancel fontSize='large' />
            </div>
            <DialogContent
            sx={{width:'100%'}}
            className={styles.dc}
            >
                <h1 className={styles.name}>{capitalizedName}</h1>
                <div className={styles.dialogContent}>
                    <div className={styles.tvflex}>
                        <div className={styles.tvflexChild}>
                            <h2>Date</h2>
                            <div>{date}</div>
                        </div> 
                        <div className={styles.tvflexChild}>
                            <h2>Timing</h2>
                            <div>{timeFrom} - {timeTo}</div>
                        </div>
                    </div>

                    <div className={styles.venuePar}>
                        <div className={styles.venue}>Venue </div><div>{venue}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={`/events/${name}`} className={styles.button} style={{ textDecoration: 'none' }}>
                            Click To Know Details
                        </Link>
                    </div>

                    <Link href={linkPath} style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'white' }}>
                        <div className={styles.submitButton}>
                            <div>register</div>
                        </div>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventDetails;
