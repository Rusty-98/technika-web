import React, { useState, useEffect } from 'react'
import styles from './home.module.css'
import CarouselTop from '@/components/CarouselTop'
import Events from '@/components/Events'
import Land from '@/components/Land'
import Tshirtmodel from '@/components/Tshirtmodel'
import Sponsors from '@/components/Sponsors'
import 'react-creative-cursor/dist/styles.css';
import Footer from '@/components/Footer'
import Team from '@/components/Team'
import Loading from '@/components/Loading'
import MerchandiseSlider from '@/components/MerchandiseSlider'
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

export default function Home({ navbarLinkClicked }) {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const animationProps = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0.7, transform: 'scale(0.8)' },
    config: { tension: 200, friction: 10 },
    reset: true, // Reset animation when it goes out of view
  });


  const translateinx = useSpring({
    opacity: 1,
    transform: 'translateX(0px)',
    from: { opacity: 0, transform: 'translateX(50px)' },
    config: { tension: 120, friction: 16 },
    reset: true,
  });
  const translateinx2 = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(150px)' },
    config: { tension: 60, friction: 30 },
    reset: true,
  });




  const [refMerchandiseSlider, inViewMerchandiseSlider] = useInView({
    triggerOnce: false,
  });

  const [refFooter, inViewFooter] = useInView({
    triggerOnce: true,
  });


  return (
    <div className={styles.mainDiv}>
      {showLoading && !navbarLinkClicked && <Loading />}
      <div>
        {/* <Events/> */}
        <Land />
        <div className='carouseldiv'>
          <CarouselTop />
        </div>

        {/* <div style={{ marginTop: '5rem' }}>
          <Tshirtmodel />

        </div> */}
        {/* <Merch /> */}
          {/* <CarouselTop /> */}
          {/* <MerchandiseSlider /> */}

        {/* <CarouselTop /> */}
        <Events isHome={true} />
        {/* <CarouselTop /> */}
        <Team showThreeDepartments={true} />
        <Sponsors />
        <animated.div ref={refFooter} style={inViewFooter ? translateinx2 : {}}>
          <Footer />

        </animated.div>

        < script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Technika'24",
            "url": "https://www.technika.ae.org",
            "logo": "https://www.technika.ae.org/fav2.png",
            "description": "Empowering students with technical skills and fostering innovation within the college community.",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-9120657951",
                "contactType": "technical support"
              },
            ]
          })
        }} />

        < script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.technika.ae.org",
            "name": "Technika'24",
            "description": "Empowering students with technical skills and fostering innovation within the college community.",
            "publisher": {
              "@type": "Organization",
              "name": "Technika'24",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.technika.ae.org/images/logo.png"
              }
            }
          })
        }} />

      </div>
    </div>
  )
}
