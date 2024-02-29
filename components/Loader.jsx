import React from 'react';
import style from './compstyles/loader.module.css';
import { HashLoader } from 'react-spinners';

const Loader = () => {
    
    const skeletonArray = Array.from({ length: 3 });

    return (
        <div className={style.main}>
            <HashLoader color="#4c5654" className={style.logo} />
            <h1 className={style.top2}>Loading...</h1>
            {/* <div className={styles.pro}>
                <div className={styles.in}>
                    <div className={styles.proin}>
                        <Skeleton variant="rectangular" height={260} sx={{bgcolor: "#4c5654"}} />
                        <div className={styles.imgOver}></div>
                    </div>
                    <div className={`${styles.protxt}`}><Skeleton sx={{bgcolor: "#4c5654"}} /></div>
                    <div className={styles.pos}><Skeleton sx={{bgcolor: "#4c5654"}} /></div>
                </div>
            </div> */}

        </div>
    );
};

export default Loader;
