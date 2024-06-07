import React from "react";
import styles from "./enemyHealthBar.module.css";

const EnemyHealthBar = ({ health }) => {
  return (
    <div className={styles.healthBar}>
      <div className={styles.health} style={{ width: `${health}%` }} />
    </div>
  );
};

export default EnemyHealthBar;
