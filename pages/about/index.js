import React from 'react'
import Image from 'next/image'
import styles from './about.module.css'
import Footer from '@/components/Footer'
const index = () => {
  return (
    <div className={styles.mainDiv}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Image src={'/images/techart.jpg'} width={4160} height={2773} alt='technika23' className={styles.techart}></Image>
        <h1>ABOUT US</h1>
        <div className={styles.table}>
          <div className={styles.tablechild}>
            <h2>VISION</h2>
            <p>
              We envision fostering a dynamic and innovative community that thrives on pushing the boundaries of technology and empowers students to innovate fearlessly .
              We are committed to provide resources, mentorship, and opportunities for skill development, ensuring our members stay at the forefront of technological advancements.
            </p>
          </div>
          <div className={styles.tablechild}>

            <h2>MISSION</h2>
            <p>To facilitate hands-on workshops, seminars, and training sessions to enhance technical skills.
              To provide networking opportunities among like-minded individuals.
              To provide resources and support for self-paced learning.
              To make students technically sound so that they can help in upliftment and betterment of society and mankind with the use of technology.</p>
          </div>
        </div>

        <h1>ASSOCIATED CLUBS</h1>
        <div className={styles.table}>
          <div className={styles.tablechild2}>
            <Image src={'/images/about/autorob.jpg'} width={640} height={640} alt='autorob'></Image>
            <h2>Autorob</h2>
            <p>
              This club mainly focus on automation and robotics engineering and  provides industrial automation solutions with a view to augmenting the production process.

            </p>
          </div>
          <div className={styles.tablechild2}>
          <Image src={'/images/about/aeroclub.png'} width={640} height={640} alt='autorob'></Image>

            <h2>Aeroclub </h2>
            <p>
              The activities here ranges from designing and fabrication to flying small air vehicles including the drones, RC planes.
              It provides the skill development in the aerodynamics, and explores into the world of aviation.


            </p>
          </div>
          <div className={styles.tablechild2}>
          <Image src={'/images/about/photon.png'} width={640} height={640} alt='autorob'></Image>

            <h2>Photon</h2>
            <p>
              The functioning of this club mainly focus in various activities such as graphic designing, UI/UX, video editing, photo editing.
              They conduct various workshop and competitions to provide students a platform to apply and show their skills .


            </p>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default index