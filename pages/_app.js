import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import { useMediaQuery } from '@mui/material'
import { Cursor } from 'react-creative-cursor'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TypeAdminPassword from '@/components/TypeAdminPassword';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoadingBar from 'react-top-loading-bar';
import Navbar from '@/components/Navbar'
import CssBaseline from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // white color
    },
  },
});

export default function App({ Component, pageProps }) {
  const isLargeScreen = useMediaQuery('(min-width: 1000px)');

  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    const startProgress = () => {
      setProgress((prev) => {
        const newProgress = prev + 1; // Adjust the increment value as needed
        return newProgress >= 100 ? 100 : newProgress;
      });
    };

    router.events.on('routeChangeStart', () => {
      setProgress(0);
      interval = setInterval(startProgress, 50); // Adjust the interval as needed
    });

    router.events.on('routeChangeComplete', () => {
      clearInterval(interval);
      setProgress(100);
    });


    return () => {
      clearInterval(interval);
    };
  }, [router.events]);



  useEffect(() => {

    router.events.on('routeChangeStart', () => {
    });

    router.events.on('routeChangeComplete', () => {
    });


    return () => {

    };
  }, []);



  useEffect(() => {
    const fetchLoginFlag = async () => {
      try {
        const response = await fetch('/api/get-login-flag');
        const data = await response.json();

        if (data.success) {
          const loginFlag = localStorage.getItem('loginFlag');
          setIsLoggedIn(loginFlag === data.loginFlag);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching login flag:', error);
        setLoading(false);
      }
    };

    if (isAdminPage) {
      fetchLoginFlag();
    }
  }, [isAdminPage]);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const [navbarLinkClicked, setNavbarLinkClicked] = useState(false);

  const handleNavbarLinkClick = () => {
    setNavbarLinkClicked(true);
  };
  return (
    <>
      <Head>
        <title>{`Technika HBTU `}</title>
        <meta name="description" content={`Technika HBTU - The official technical fest of HBTU`} />
        <link rel="icon" type="image/png" href="/fav2.png" style={{ width: '100%', height: '100%' }} />
        <meta property="og:title" content={`Technika HBTU `} />
        <meta property="og:description" content={`Technika HBTU - The official technical fest of HBTU`} />
        <meta property="og:image" content={'https://www.technika.ae.org/images/technikashare.png'} />
        <meta property="og:url" content={`https://www.technika.ae.org`} />
        <meta property="og:site_name" content="Technika" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name="twitter:title" content={`Technika HBTU `} key="tw-title" />
        <meta name="twitter:description" content={`Technika HBTU - The official technical fest of HBTU`} key="tw-desc" />
        <meta name="twitter:image" content={'https://www.technika.ae.org/images//technikashare.png'} key="tw-image" />
        <meta name="twitter:card" content="summary_large_image" key="tw-card" />
        <meta property="og:keywords" content={`technika, technkia hbtu, hbtu, hbtu fests, technical fest`} />


      </Head>
      <LoadingBar
        height={3}
        color='#ff00ae70'
        progress={progress}
        waitingTime={600}
        onLoaderFinished={() => setProgress(0)}
      />
      {isAdminPage ? (
        <ThemeProvider theme={darkTheme}>
          {loading ? (
            <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ color: 'white' }}>Loading...</p>
            </div>
          ) : (
            isLoggedIn ? (
              <Component {...pageProps} />
            ) : (
              <TypeAdminPassword onLogin={handleLogin} />
            )
          )}
          <style>
            {`
              html, body {
                background-color: #1a1a1a;
                color: #f0f0f0;
                font-family: Jost, sans-serif;
                margin: 0;
                height: 100%;
              }
            `}
          </style>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <div style={{ position: 'relative' }}>
            {!isAdminPage && <>
              {isLargeScreen && <div style={{ height: '0' }}><Cursor isGelly={true} cursorBackgrounColor='#ffffff55' />
                <div style={{ top: "0", height: "3rem", width: "100%", position: "absolute", zIndex: 1 }}>
                  <Navbar onNavbarLinkClick={handleNavbarLinkClick} />

                </div>

              </div>}
              <div style={{ position: 'absolute', top: '0', right: '0', zIndex: '999' }}>
                <Sidebar onNavbarLinkClick={handleNavbarLinkClick} />
              </div>
            </>}
            <div>
              <Component {...pageProps} navbarLinkClicked={navbarLinkClicked} />
            </div>
          </div>
        </ThemeProvider>

      )}
    </>
  );
}
