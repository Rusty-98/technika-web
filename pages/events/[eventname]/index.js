// EventDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/components/compstyles/part1.module.css';
import CircleIcon from '@mui/icons-material/Circle';

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventname } = router.query;
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/get-event-details?eventname=${eventname}`);
        if (response.ok) {
          const data = await response.json();
          setEventDetails(data.event);
        } else {
          console.error('Failed to fetch event details');
        }
      } catch (error) {
        console.error('Error during fetch', error);
      }
    };

    if (eventname) {
      fetchEventDetails();
    }
  }, [eventname]);

  return (
    <>
      <Head>
        <title>{eventname}</title>
      </Head>
      <div className={styles.mainbg}>
        <div className={styles.formContent} data-cursor-color='rgba(255,155,255,0.7)'>
          <h2 className={styles.mainHeading} >About The Event</h2>
          <h1 className={styles.formTitle} >{eventname?.toUpperCase()}</h1>
          {eventDetails && (
            <p className={styles.subHeading}>{eventDetails.about}</p>
          )}
          <h3 className={styles.mainHeading} >Guidelines</h3>
          <div className={styles.guidelinesPaper}>
            <div>
              {eventDetails && eventDetails.guidelines.map((guideline, index) => (
                <ul key={index}>
                  <li style={{ listStyleType: 'none', display: 'flex', alignItems: 'flex-start', textAlign: 'left', marginRight: '1rem', color:'rgba(255, 255, 255, 0.8)' }} className={styles.guidelines}>
                    <CircleIcon className={styles.guidelineDisk} /> {guideline}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventDetailsPage;
