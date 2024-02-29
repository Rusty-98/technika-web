import React from "react";
import styles from "./compstyles/text.module.css";

const Text = ({ prop, isStudentSec }) => {
  return (
    <div>
      <div className={`${styles.txt} ${isStudentSec ? styles.studentSec : ''}`}>
        {isStudentSec ? (
          <>
            Student
            <br />
            Secretary
          </>
        ) : (
          prop
        )}
      </div>
    </div>
  );
};

export default Text;
