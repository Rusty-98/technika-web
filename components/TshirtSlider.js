import React from 'react';
import Image from 'next/image';
import styles from './compstyles/merchandiseslider.module.css';
import Link from 'next/link';

const tshirts = [
  {
    itemName: 'tshirtb',
    imageSrc: '/images/merch/boy2.gif',
    price: '₹435',
    variant: 'Boy Print'
  },
  {
    itemName: 'tshirtg',
    imageSrc: '/images/merch/girl2.gif',
    price: '₹435',
    variant: 'Girl Print'

  },

];
const TshirtSlider = () => {
  return (
    <div className={styles.main} style={{ width: '100vw' }}>

      <div className={styles.slider}>
        {tshirts.map((item, index) => (
          <div className={styles.slide} key={index}>
            <Link href={`/merchandiseform/${item.itemName}`} style={{ textDecoration: 'none' }}>
              <Image className={styles.image} src={item.imageSrc} width={1080 / 1.5} height={710 / 1.5} alt='tshirt' />
              <div className={styles.details}>
                <div className={styles.keemat}>{item.variant}</div>
              </div>
              <div className={styles.details}>
                <p className={styles.keemat} style={{ display: 'flex', flexDirection: 'column' }}><span style={{ textDecoration: 'line-through', opacity: '0.7', fontSize: '0.9rem' }}>₹599</span>{item.price} </p>
                <p className={styles.buy}>Buy Now</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.slider}>
        <div className={styles.slide}>
          <Link href={`/merchandiseform/tshirtcombo`} style={{ textDecoration: 'none' }}>
            <Image className={styles.image2} src={'/images/merch/t-shirt-combo.png'} width={1080 / 1.5} height={710 / 1.5} alt='tshirt' />
            <div className={styles.details}>
              <div className={styles.keemat}>Tshirt Combo</div>
            </div>
            <div className={styles.details}>
              <p className={styles.keemat} style={{ display: 'flex', flexDirection: 'column' }}><span style={{ textDecoration: 'line-through', opacity: '0.7', fontSize: '0.9rem' }}>₹999</span>₹849</p>
              <p className={styles.buy}>Buy Now</p>
            </div>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default TshirtSlider