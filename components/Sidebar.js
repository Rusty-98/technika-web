import React, { useState, useEffect } from 'react';
import styles from './compstyles/sidebar.module.css';
import Image from 'next/image';
import Menu from './Menu';
import { useRouter } from 'next/router';
const Sidebar = ({onNavbarLinkClick}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const click = () => {
    setOpen(!open);
  };
  useEffect(() => {
    // Close the sidebar when the route changes
    setOpen(false);
  }, [router.asPath]);

  const img = '/images/logo.png'

  return (
    <div className={open ? styles.mainDiv : styles.mainDivHi}>
      <div className={styles.top}>
        <div className={styles.circle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="38"
            viewBox="0 0 40 38"
            className={styles.cir}
            onClick={click}
            fill="none"
          >
            <path
              d="M39.5 19C39.5 29.1934 30.794 37.5 20 37.5C9.20597 37.5 0.5 29.1934 0.5 19C0.5 8.80659 9.20597 0.5 20 0.5C30.794 0.5 39.5 8.80659 39.5 19Z"
              stroke="url(#paint0_linear_10_23)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_10_23"
                x1="20"
                y1="0"
                x2="20"
                y2="38"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0B5DFC" />
                <stop offset="1" stopColor="#FF00D6" stopOpacity="0.74" />
              </linearGradient>
            </defs>
          </svg>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M14 14L3 3.00002M14 3L3.00001 14"
                stroke="url(#paint0_linear_10_26)"
                strokeWidth="4.76776"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_10_26"
                  x1="8.5"
                  y1="3"
                  x2="8.5"
                  y2="14"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF00D6" stopOpacity="0.74" />
                  <stop offset="1" stopColor="#7725C9" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <Image src={img} width={44} height={25} alt="Logo" />
          )}
        </div>
      </div>
      <div className={open ? styles.container : styles.hide}>
        <div className={open ? styles.imgContainer : styles.imgContainerHi}>
          <Image style={{ display: !open ? 'none' : '' }} src={img} width={162.858} height={91.4} alt="Logo" />
          <div style={{ display: !open ? 'none' : '' }} className={styles.logoText}>echnika</div>
        </div>

        <Menu text={'home'} hide={!open} href="/" onNavbarLinkClick={onNavbarLinkClick}/>
        <Menu text={'team'} hide={!open} href="/team" onNavbarLinkClick={onNavbarLinkClick}/>
        <Menu text={'about us'} hide={!open} href="/about" onNavbarLinkClick={onNavbarLinkClick}/>
        <Menu text={'events'} hide={!open} href="/events" onNavbarLinkClick={onNavbarLinkClick}/>
        <Menu text={'sponsors'} hide={!open} href="/#sponsors" onNavbarLinkClick={onNavbarLinkClick}/>
        <Menu text={'merchandises'} hide={!open} href="/merchandise" onNavbarLinkClick={onNavbarLinkClick}/>
        <Menu text={'admin'} hide={!open} href="/admin/dashboard" onNavbarLinkClick={onNavbarLinkClick}/>
      </div>
    </div>
  );
};

export default Sidebar;
