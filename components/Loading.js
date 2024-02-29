import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';

// Constants for image dimensions and timing
const IMAGE_WIDTH = 1080 / 5;
const IMAGE_HEIGHT = 1080 / 5;
const FADE_OUT_DURATION = 1000; // in milliseconds
const LOADING_SCREEN_DELAY = 3000; // in milliseconds

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isMediumScreen = useMediaQuery('(max-width:800px)');
  const isSmallScreen = useMediaQuery('(max-width:500px)');
  const audioRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, LOADING_SCREEN_DELAY);

    return () => {
      clearTimeout(timeout);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    // Set a timer with a delay of 100ms before simulating a click
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        buttonRef.current.dispatchEvent(event);
      }
    }, 100);
  
    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  

  // Calculate a responsive width percentage for the image
  const widthPercentage = isMediumScreen ? (isSmallScreen ? 80 : 60) : 50;

  // Define fade-out animation with descriptive options
  const fadeOut = useSpring({
    opacity: isVisible ? 1 : 0,
    config: {
      duration: FADE_OUT_DURATION,
      ...config.gentle, // Use a slightly eased animation
    },
  });

  return (
    <animated.div
      style={{
        ...fadeOut,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Image
        src="/intro/intro.gif"
        alt="Loading"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        style={{
          width: `${widthPercentage}%`,
          height: 'auto',
          objectFit: 'cover',
        }}
      />
      <button
        ref={buttonRef}
        onClick={() => {
          // This click handler can be empty since it's just a simulated click
        }}
        style={{ display: 'none' }}
      >
        Start Audio
      </button>
      <audio ref={audioRef} src="/intro/intro.mp3" style={{ display: 'none' }} />
    </animated.div>
  );
};

export default Loading;
