import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FormTab from '@/components/FormTab';

const EventDetailsPage = () => {
    const router = useRouter();
    const { eventname } = router.query;

    // Function to convert hyphenated string back to normal name
    const convertHyphenatedToNormal = (str) => {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Check if eventname is defined before using it
    const updatedEventName = eventname ? convertHyphenatedToNormal(eventname) : "Event";

    return (
        <>
            <Head>
                <title>{updatedEventName}</title>
            </Head>
            <div>
                {eventname && <FormTab updatedEventName={updatedEventName} />}
            </div>
        </>
    );
};

export default EventDetailsPage;
