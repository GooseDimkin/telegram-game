import React from "react";
import styles from "./healthBar.module.css";
import { colors } from "../../colors.ts";

function HealthBar({ health, lostHealth, player }) {
  return (
    <div className={styles.healthBarWrapper}>
      <div
        className={styles.healthBar}
        style={{
          width: health,
          backgroundColor: player ? colors.green : colors.red,
        }}
      />
      <div className={styles.spenthealthBar} style={{ width: lostHealth }} />
    </div>
  );
}

export default HealthBar;
