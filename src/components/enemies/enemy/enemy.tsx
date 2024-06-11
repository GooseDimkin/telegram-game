import React, { useEffect } from "react";
import styles from "./enemy.module.css";
import HealthBar from "../enemyHealthBar/enemyHealthBar";
import { IEnemyComponent } from "src/interface/interface";

const Enemy: React.FC<IEnemyComponent> = ({
  id,
  x,
  y,
  health,
  removeEnemy,
}: IEnemyComponent) => {
  useEffect(() => {
    if (health <= 0) {
      removeEnemy(id);
    }
  }, [health, id, removeEnemy]);

  return (
    <div className={styles.enemy} style={{ top: `${y}%`, right: x }}>
      <HealthBar health={health} />
      <img src="dog.gif" alt="enemy" />
    </div>
  );
};

export default Enemy;
