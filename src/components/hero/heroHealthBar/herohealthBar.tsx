import React from "react";
import styles from "./herohealthBar.module.css";

const HeroHealthBar = ({heroHealth }) => {
  return (
    <div className={styles.heroHealthBar}>
      <div
        className={`${styles.health} ${heroHealth <= 30 && styles.low}`}
        style={{ width: `${heroHealth}%` }}
      />
    </div>
  );
};

export default HeroHealthBar;
