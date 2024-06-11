import React from "react";
import styles from "./enemyHealthBar.module.css";
import { IEnemyHealthBar } from "src/interface/interface";

const EnemyHealthBar: React.FC<IEnemyHealthBar> = ({
  health,
}: IEnemyHealthBar) => {
  return (
    <div className={styles.healthBar}>
      <div className={styles.health} style={{ width: `${health}%` }} />
    </div>
  );
};

export default EnemyHealthBar;
