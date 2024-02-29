import Footer from '@/components/Footer'
import Merch from '@/components/Merch'
import Mod from '@/components/Mod'
import React from 'react'
import styles from "../../components/compstyles/team.module.css";

const index = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', flexDirection: 'column', marginTop: '10vw' }}>
        <div className={styles.top2}>Merchandise</div>
        {/* <Mod /> */}
        {/* <div style={{ color: '#7f7f7f', textAlign: 'center', fontSize: '2rem', fontFamily: 'Jost', marginBottom : '50px' }}>...COMING SOON...</div> */}
        <Merch isMerchandisePage={true} />
      </div>
      <Footer />
    </div>
  )
}

export default index
