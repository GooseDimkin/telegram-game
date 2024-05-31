import React from "react";
import styles from "./healthBar.module.css";

function HealthBar({ health, lostHealth }) {
  return (
    <div className={styles.healthBarWrapper}>
      <div className={styles.healthBar} style={{ width: health }} />
      <div className={styles.spenthealthBar} style={{ width: lostHealth }} />
    </div>
  );
}

export default HealthBar;
