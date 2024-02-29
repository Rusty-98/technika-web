import React, { useEffect } from 'react';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './compstyles/land.module.css';

const Land = () => {


  const isLargeScreen = useMediaQuery('(min-width: 800px)');

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }} className={styles.maincontainer}>
      <div className={styles.bg}>

        <Image
          data-cursor-text="Welcome to Technika"
          data-cursor-size='170px'
          priority={false}
          src={isLargeScreen ? '/images/hometopfull3.png' : '/images/hometop.jpg'}
          width={5184/8}
          height={3456/8}
          alt='bg'
          aria-describedby='Technika HBTU 2024'
          className={styles.bgImage}
        ></Image>
      </div>
      <div className={styles.centeredLogo}>
        <Image
          src={'/images/tlogo.png'}
          width={1080/3}
          height={720/3}
          alt='technika hbtu'
          aria-describedby='Technika HBTU 2024'
        />
      </div>
    </div>
  );
};

export default Land;
