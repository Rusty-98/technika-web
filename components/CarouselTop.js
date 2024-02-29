import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { register } from 'swiper/element/bundle';
import Image from 'next/image';
import styles from './compstyles/carousel.module.css'
import { EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
register();

const CarouselTop = () => {
    
    const maddyLink = 'https://www.maddycustom.com';
    const handlemaddyClick = () => {
        window.open(maddyLink, '_blank');
    };
    
    return (
        <>
            <Swiper style={{ height: 'auto', borderRadius: '2rem', "--swiper-pagination-color": "#C508A7", "--swiper-pagination-bullet-size": "0.8rem",
                "--swiper-pagination-bullet-horizontal-gap": "6px",  "--swiper-pagination-bullet-inactive-color": "#fff",
                "--swiper-pagination-bullet-inactive-opacity": "0.6", "--swiper-pagination-bottom": "20px",  }}
                // className={styles.carbg}
                spaceBetween={5}
                effect="fade"
                modules={[EffectFade]} 
                pagination={{
                    type: 'bullets',
                    dynamicBullets:true,
                    dynamicMainBullets:2,
                }}
                loop={true} speed={1000} simulateTouch={true} autoplay={{ delay: 3000, disableOnInteraction: false, }} >
                <SwiperSlide style={{backgroundColor:'black', borderRadius:'2rem', height:'auto'}} data-cursor-text='Glimpses' data-cursor-size='180px' data-cursor-color='rgba(0,0,0,0,2)'> <div > <Image src="/first-new.jpg" alt="image1" width={1600/4} height={900/4} className={styles.carImg} /></div></SwiperSlide>
                <SwiperSlide style={{backgroundColor:'black', borderRadius:'2rem', height:'auto', cursor:'pointer'}} data-cursor-text='Our sponsor' data-cursor-size='180px' data-cursor-color='rgba(0,0,0,0,2)'> <div > <Image src="/fifth.jpg" alt="image5" width={1600/4} height={900/4} onClick={handlemaddyClick} className={styles.carImg} /></div></SwiperSlide>
                <SwiperSlide style={{backgroundColor:'black', borderRadius:'2rem', height:'auto'}} data-cursor-text='Glimpses' data-cursor-size='180px' data-cursor-color='rgba(0,0,0,0,2)'> <div > <Image src="/second.png" alt="image2" width={1600/4} height={900/4} className={styles.carImg} /></div></SwiperSlide>
                <SwiperSlide style={{backgroundColor:'black', borderRadius:'2rem', height:'auto'}} data-cursor-text='Glimpses' data-cursor-size='180px' data-cursor-color='rgba(0,0,0,0,2)'> <div > <Image src="/third.png" alt="image3" width={1600/4} height={900/4} className={styles.carImg} /></div></SwiperSlide>
                <SwiperSlide style={{backgroundColor:'black', borderRadius:'2rem', height:'auto'}} data-cursor-text='Glimpses' data-cursor-size='180px' data-cursor-color='rgba(0,0,0,0,2)'> <div > <Image src="/four.png" alt="image4" width={1600/4} height={900/4} className={styles.carImg} /></div></SwiperSlide>
            </Swiper>
            <div className="swiper-pagination"></div>
        </>
    )
}
export default CarouselTop;
 
