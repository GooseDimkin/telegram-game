import React from "react";
import styles from "./healthBar.module.css";

const HealthBar = ({ health }) => {
  return (
    <div className={styles.healthBar}>
      <div className={styles.health} style={{ width: `${health}%` }} />
    </div>
  );
};

export default HealthBar;
