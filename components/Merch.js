import styles from './compstyles/merch.module.css';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import TshirtSlider from './TshirtSlider';


const data = [
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
    //     itemName: 'combo',
    //     imageSrc: '/images/merch/combo.JPG',
    //     price: '₹199',
    // },
];

const Merch = () => {
    return (
        <>
            {/* <TshirtSlider /> */}
            <div className={styles.main2}>
                {
                    data.map((item, index) => (
                        <div key={index}>
                            <Link href={`/merchandiseform/${item.itemName}`} style={{ textDecoration: 'none' }}>
                                <div className={styles.box}>
                                    <div className={styles.in}>
                                        <img src={item.imageSrc} className={styles.merchimg} alt="" />
                                    </div>
                                </div>
                                <div className={styles.details}>
                                    {/* You can display other details here */}
                                    <p className={styles.keemat}>{item.price}</p>
                                    <p className={styles.buy}>Buy Now</p>
                                </div>
                            </Link>

                        </div>
                    ))
                }

                <Link href={`/merchandiseform/combo`} style={{ textDecoration: 'none' }}>
                    <div className={styles.box}>
                        <div className={styles.in} style={{ position: 'relative', backgroundColor: '#DDDFE5' }}>
                            <img src={'/images/specialoffer.png'} width={512 / 3} height={512 / 3} alt='' className={styles.specialoffer} />

                            <img src={'/images/merch/combo.JPG'} className={styles.merchimg} alt="" />
                        </div>
                    </div>
                    <div className={styles.details}>
                        {/* You can display other details here */}
                        <p className={styles.keemat}>{'₹199'}</p>
                        <p className={styles.buy}>Buy Now</p>
                    </div>
                </Link>

               {/* <Link href={`/merchandiseform/tshirtcombo`} style={{ textDecoration: 'none' }}>
                    <div className={styles.box}>
                        <div className={styles.in} style={{ position: 'relative', backgroundColor: '#DDDFE5' }}>
                            <img src={'/images/specialoffer.png'} width={512 / 3} height={512 / 3} alt='' className={styles.specialoffer} />

                            <img src={'/images/merch/t-shirt-combo.png'} className={styles.merchimg} alt="" />
                        </div>
                    </div>
                    <div className={styles.details}>
                        // You can display other details here
                        <p className={styles.keemat}>{'₹849'}</p>
                        <p className={styles.buy}>Buy Now</p>
                    </div>
                </Link> */}


            </div >
        </>
    )
}

export default Merch