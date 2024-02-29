import { useState, useEffect } from 'react';
import Router from 'next/router';
import ReactPlayer from 'react-player';

const VideoLoader = () => {
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    // Check if it's the first time user is visiting the site
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

    if (!hasVisitedBefore) {
      // User is visiting for the first time, play the video
      setShouldPlay(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    } else {
      // User has visited before, check if coming from another page via navigation
      Router.beforePopState(() => {
        setShouldPlay(false);
        return true;
      });
    }
  }, []);

  const handleVideoEnd = () => {
    setShouldPlay(false);
  };

  return (
    shouldPlay && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
        }}
      >
        <ReactPlayer
          url="/video/intro.mp4"
          playing={true}
          loop={false}
          controls={false}
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
        />
      </div>
    )
  );
};

export default VideoLoader;
