import React, { useEffect, useState } from "react";
import styles from "./enemy.module.css";
import HealthBar from "../enemyHealthBar/enemyHealthBar";
import { IEnemyComponent } from "src/interface/interface";

const Enemy: React.FC<IEnemyComponent> = ({
  id,
  x,
  y,
  health,
  removeEnemy,
  skin,
  currentWave
}: IEnemyComponent) => {
  useEffect(() => {
    if (health <= 0) {
      removeEnemy(id);
    }
  }, [health, id, removeEnemy]);

  const [imgHeight, setImgHeight] = useState<string>('100px')
  const [imgWidth, setImgWidth] = useState<string>('90px')

  useEffect(() => {
    switch(currentWave) {
      case 1:
        setImgHeight('50px')
        break;
    }

  }, [currentWave])

  return (
    <div className={styles.enemy} style={{ top: `${y}%`, right: x }}>
      <HealthBar health={health} />
      <img src={skin} alt="enemy" style={{ height: imgHeight, width: imgWidth }} />
    </div>
  );
};

export default Enemy;
