import React, { useState, useEffect } from 'react';
import style from './compstyles/events.module.css';
import EventDetails from './EventDetails';
import EventCard from '@/components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  const handleEventClick = (event) => {
    console.log(event);
    setSelectedEvent(event);
  };
  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      {selectedEvent && (
        <EventDetails
          key={selectedEvent._id}
          display={true}
          name={selectedEvent.name}
          category={selectedEvent.category}
          date={formatDate(selectedEvent.date)}
          timeFrom={formatTime(selectedEvent.timeFrom)}
          timeTo={formatTime(selectedEvent.timeTo)}
          venue={selectedEvent.venue}
          onClose={handleCloseEventDetails}
        />
      )}
      <div className={style.parentCard}>
        <p className={style.heading}>Events</p>
        <div className={style.wrapper}>
          {events.map((event) => (
            <div onClick={() => handleEventClick(event)}>
              <EventCard
                key={event._id}
                text={event.name}
                prize={"2000"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
