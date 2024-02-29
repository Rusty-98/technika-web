import React from "react";
import style from "./compstyles/card.module.css";
import Image from "next/image";

const Card = ({ name, position, updatedImageUrl, number }) => {
  const isLongName = name.length > 14;
  const isTooLongName = name.length > 16;
  return (
    <div className={style.pro}>
      <div className={style.in}>  
        <div className={style.proin}>
          <Image
            src={`/local_images/imagestsc/${updatedImageUrl}`}
            height={960}
            width={1280}
            quality={70}
            // objectFit="contain"
            alt={'member'}
            className={style.proimg}
          />
          <div className={style.imgOver}></div>
        </div>
        <div className={`${style.protxt} ${isLongName ? style.longName : ''} ${isTooLongName ? style.tooLongName : ''}`}>{name}</div>
        <div className={style.pos}>{position}</div>
      </div>
    </div>
  );
};

export default Card;