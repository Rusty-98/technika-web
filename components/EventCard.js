import React, { useState, useEffect } from 'react'
import styles from './compstyles/eventcard.module.css'
const EventCard = ({ text, prize }) => {
  return (
    <div className={styles.fullCard} >
      <div className={styles.cardBorderDiv} >
        <div className={styles.glow} />
        <div className={styles.black}>

          <div className={styles.cardDiv}>
            <div className={styles.border}>
              <p className={styles.mainText}>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard; 