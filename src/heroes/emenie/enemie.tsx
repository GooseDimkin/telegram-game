import React, { useEffect, useState } from "react";
import styles from "./enemie.module.css";
import HealthBar from "../../elements/healthBar/healthBar.tsx";

function Enemie() {
  const [enemieHealth1, setEnemieHealth1] = useState(100);
  const [enemieHealth1LostHealth, setEnemieHealth1LostHealth] = useState(100);

  useEffect(() => {
    let intervalEnemies;
    const decreaseEnemy1health = () => {
      setEnemieHealth1((prevCount) => prevCount - 10);
      setEnemieHealth1LostHealth((prevState) => prevState - 10);
    };
    intervalEnemies = setInterval(decreaseEnemy1health, 1000);

    return () => clearInterval(intervalEnemies);
  }, []);

  return (
    <div className={styles.enemyWrapper}>
      <HealthBar health={enemieHealth1} lostHealth={enemieHealth1LostHealth} />
      <div className={styles.enemy} />
    </div>
  );
}

export default Enemie;
