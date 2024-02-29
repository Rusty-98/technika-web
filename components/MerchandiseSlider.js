import React from 'react';
import Image from 'next/image';
import styles from './compstyles/merchandiseslider.module.css';
import Link from 'next/link';
import TshirtSlider from './TshirtSlider';

const merchandiseItems = [
  {
    itemName: 'diary',
    imageSrc: '/images/merch/noteopen.webp',
    price: '₹49',
  },
  {
    itemName: 'keychain',
    imageSrc: '/images/merch/keychain3.jpg',
    price: '₹39',
  },
  {
    itemName: 'coffeemug',
    imageSrc: '/images/merch/cup2.jpg',
    price: '₹129',
  },
  {
    itemName: 'pen',
    imageSrc: '/images/merch/pen2.jpg',
    price: '₹12',
  },
  // {
  //   itemName: 'combo',
  //   imageSrc: '/images/merch/combo.JPG',
  //   price: '₹199',
  // },
];

const MerchandiseSlider = () => {
  return (
    <div className={styles.main}>
      <TshirtSlider/>
      <div className={styles.slider}>
        {merchandiseItems.map((item, index) => (
          <div className={styles.slide} key={index}>
            <Link href={`/merchandiseform/${item.itemName}`} style={{ textDecoration: 'none' }}>
              <Image className={styles.image} src={item.imageSrc} width={1170 / 3} height={2080 / 3} alt='' />
              <div className={styles.details}>
                <p className={styles.keemat}>{item.price}</p>
                <p className={styles.buy}>Buy Now</p>
              </div>
            </Link>
          </div>
        ))}
          <div className={styles.slide} style={{position:'relative'}}>
          <Image src={'/images/specialoffer.png'} width={512 / 3} height={512 / 3} alt='' className={styles.specialoffer}/>
            <Link href={`/merchandiseform/combo`} style={{ textDecoration: 'none' }}>
              <Image className={styles.image} src={'/images/merch/combo.JPG'} width={1170 / 3} height={2080 / 3} alt='' />
              <div className={styles.details}>
                <p className={styles.keemat}>{'₹199'}</p>
                <p className={styles.buy}>Buy Now</p>
              </div>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default MerchandiseSlider;
