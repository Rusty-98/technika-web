import React, { useState, useEffect } from 'react';
import style from './compstyles/events.module.css';
import EventDetails from './EventDetails';
import EventCard from '@/components/EventCard';
import Link from 'next/link';

const Events = ({ isHome }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectTab, setSelectTab] = useState("All");

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

  const handleTabClick = (event) => {
    if (event.currentTarget.textContent === "All") {
      setSelectTab("All");
      return;
    }
    const value = event.currentTarget.textContent.slice(0, -1);
    setSelectTab(value);
  }

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectTab(value);
  };

  let filteredEvents = selectTab === "All" ? events : events.filter(event => event.category === selectTab);

  if (isHome) {
    filteredEvents = filteredEvents.slice(0, 5);
  }

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
        <div className={style.tabContainer}>
          <div className={style.tab}>
            <div className={selectTab === "All" ? style.select : style.tabChild} onClick={handleTabClick}>All</div>
            <div className={selectTab === "Technical event" ? style.select : style.tabChild} onClick={handleTabClick}>Technical events</div>
            <div className={selectTab === "Aeroclub event" ? style.select : style.tabChild} onClick={handleTabClick}>Aeroclub events</div>
            <div className={selectTab === "Autorob event" ? style.select : style.tabChild} onClick={handleTabClick}>Autorob events</div>
            <div className={selectTab === "Coding event" ? style.select : style.tabChild} onClick={handleTabClick}>Coding events</div>
          </div>
          <div className={style.list}>
            <select name="event" id="event" className={style.listItem} value={selectTab} onChange={handleDropdownChange}>
              <option value="All" className={style.listItem}>All</option>
              <option value="Technical event" className={style.listItem}>Technical events</option>
              <option value="Aeroclub event" className={style.listItem}>Aeroclub events</option>
              <option value="Autorob event" className={style.listItem}>Autorob events</option>
              <option value="Coding event" className={style.listItem}>Coding events</option>
            </select>

          </div>
        </div>
        <div className={style.wrapper}>
          {filteredEvents.map((event) => (
            <div onClick={() => handleEventClick(event)}>
              <EventCard
                key={event._id}
                text={event.name}
                prize={"2000"}
                img={EventImg.find(img => img[event.name]) ? EventImg.find(img => img[event.name])[event.name] : ""}
              />
            </div>
          ))}
          {isHome && <Link href={"/events"} className={style.more}>
            <EventCard
              text={"See More..."}
              prize={"2000"}
            />
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default Events;

const EventImg = [
  {
    "Robot Soccer": "/events/roboSoccer.webp"
  },
  {
    "Water Rocket": "/events/water.webp"
  },
  {
    "Aircraft Simulation": "/events/airSim.webp"
  },
  {
    "Water Rocket": "/events/test.webp"
  },
  {
    "Robo Race": "/events/race.webp"
  },
  {
    "Junkyard": "/events/junk.webp"
  },
  {
    "Hackathon": "/events/hackathon.webp"
  },
  {
    "Junkyard": "/events/junk.webp"
  },
  {
    "Robo Wrestling": "/events/test.jpg"
  },
  {
    "Escape Room": "/events/escape.webp"
  },
  {
    "Robo Wrestling": "/events/test.webp"
  },
]