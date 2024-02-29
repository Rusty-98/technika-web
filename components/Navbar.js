import React, { useState, useEffect } from 'react';
import styles from './compstyles/sidebar.module.css';
import Image from 'next/image';
import Menu from './Menu';
import { useRouter } from 'next/router';
import { width } from '@mui/system';
import { Link } from '@mui/material';

const Navbar = ({ onNavbarLinkClick }) => {
  const router = useRouter();

  const img = '/images/homepage_icons/logo.png';

  return (
    <div style={{ width: "100%", color: "white", height: "100%", fontStyle: "italic", fontSize: "1.4rem", fontFamily: "sans-serif", display: "flex", justifyContent: "space-around", alignItems: "center" }}>

      <div style={{ padding: "5px", paddingRight: "10px" }}>
        <div onClick={() => { onNavbarLinkClick(); router.push('/'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image src='/images/homepage_icons/home.png' width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

      <div style={{ padding: "5px", paddingRight: "10px" }}>
        <div onClick={() => { onNavbarLinkClick(); router.push('/events'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image src='/images/homepage_icons/event.PNG' width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

      <div style={{ padding: "5px", paddingRight: "10px" }} >
        <div onClick={() => { onNavbarLinkClick(); router.push('/team'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image src='/images/homepage_icons/team.PNG' width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

      <div style={{ padding: "5px", paddingRight: "10px" }}>
        <div onClick={() => { onNavbarLinkClick(); router.push('/about'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image  src='/images/homepage_icons/about.PNG' width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

      <div style={{ padding: "5px", paddingRight: "10px" }}>
        <div onClick={() => { onNavbarLinkClick(); router.push('/#sponsors'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image src="/images/homepage_icons/sponsors.PNG" width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

      <div style={{ padding: "5px", paddingRight: "10px" }}>
        <div onClick={() => { onNavbarLinkClick(); router.push('/merchandise'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image src='/images/homepage_icons/merchandise.PNG' width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

      <div style={{ padding: "5px", paddingRight: "10px" }}>
        <div onClick={() => { onNavbarLinkClick(); router.push('/admin/dashboard'); }} style={{ outline: "none !important", textDecoration: "none", color: "white", cursor:'pointer' }}>
          <Image src='/images/homepage_icons/admin.png' width={801/3} height={311/3} alt='' style={{height:'40px', width:'auto'}}></Image>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
