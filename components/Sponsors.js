import React from 'react'
import SponsorCarousel from './SponsorCarousel'
import styles from './compstyles/sponsors.module.css'
import Image from 'next/image'
const Sponsors = () => {
    const importAll = (r) => r.keys().map(r);
    const sponsorImages = importAll(require.context('../public/images/sponsors', false, /\.(png|jpe?g|svg)$/));
    const sponsorImages2 = importAll(require.context('../public/images/sponsors2', false, /\.(png|jpe?g|svg)$/));
  

    return (
        <div id='sponsors'>
            <div>

                <SponsorCarousel sponsorsimgs={sponsorImages} reversedirection={false}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
                <Image width={3366} height={5799} src={'/images/Sponsors.png'} alt='' className={styles.title}></Image>

            </div>

            <div>

                <SponsorCarousel sponsorsimgs={sponsorImages2} reversedirection={true}/>
            </div>
        </div>
    )
}

export default Sponsors
