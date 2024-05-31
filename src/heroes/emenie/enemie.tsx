import React, { useEffect, useState } from "react";
import styles from "./enemie.module.css";
import HealthBar from "../../elements/healthBar/healthBar.tsx";

function Enemie() {
  const [enemieHealth, setEnemieHealth] = useState(100);
  const [enemieHealthLostHealth, setEnemieHealthLostHealth] = useState(100);

  const DAMAGE = 10;

  useEffect(() => {
    let intervalEnemies;
    const decreaseEnemy1health = () => {
      setEnemieHealth((prevCount) => prevCount - DAMAGE);
      setEnemieHealthLostHealth((prevState) => prevState - DAMAGE);
    };
    intervalEnemies = setInterval(decreaseEnemy1health, 1000);

    return () => clearInterval(intervalEnemies);
  }, []);

  return (
    <div className={styles.enemyWrapper}>
      <HealthBar health={enemieHealth} lostHealth={enemieHealthLostHealth} />
      <div className={styles.enemy} />
    </div>
  );
}

export default Enemie;
