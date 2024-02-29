import React from 'react';
import styles from './AdminDashboard.module.css';
import Link from 'next/link';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentIcon from '@mui/icons-material/Payment';

const AdminDashboard = () => {
    const adminLinks = [
        { label: 'Merchandise', href: '/admin/seemerchandisepayments', icon: <PaymentIcon /> },
        { label: 'Events Registration', href: '/admin/seeEventRegistrations', icon: <EventNoteIcon /> },
        { label: 'Add Event', href: '/admin/add-event', icon: <AddCircleOutlineIcon /> },
        { label: 'Delete Events', href: '/admin/delete-events', icon: <DeleteOutlineIcon /> },
        { label: 'Edit Events', href: '/admin/edit-events', icon: <EditOutlinedIcon /> },
        { label: 'Add Event Details', href: '/admin/add-event-details', icon: <LibraryAddIcon /> },
        { label: 'Add A Team Member', href: '/admin/add-team-member', icon: <PersonAddIcon /> },
    ];

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.technika}>Technika HBTU</h1>
            <div className={styles.container}>
                <h1 className={styles.heading}>Greetings, Admin</h1>
                <p className={styles.description}>Begin managing the content seamlessly</p>

                <Grid container spacing={2}>
                    {adminLinks.map((link, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <Link href={link.href} passHref>
                                <Card className={styles.card}>
                                    <CardContent className={styles.cardContent}>
                                        <div className={styles.icon}>{link.icon}</div>
                                        <Typography variant="h6" component="div" color="white" style={{ textDecoration: 'none' }}>
                                            {link.label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default AdminDashboard;
