import React, { useEffect, useState } from "react";
import styles from "./enemy.module.css";
import HealthBar from "../../elements/healthBar/healthBar.tsx";

function Enemie({ takenDamage, position }) {
  const [enemieHealth, setEnemieHealth] = useState(100);
  const [enemieHealthLostHealth, setEnemieHealthLostHealth] = useState(100);

  useEffect(() => {
    let intervalEnemies;
    const decreaseEnemy1health = () => {
      setEnemieHealth((prevCount) => prevCount - takenDamage);
      setEnemieHealthLostHealth((prevState) => prevState - takenDamage);
    };
    intervalEnemies = setInterval(decreaseEnemy1health, 1000);

    return () => clearInterval(intervalEnemies);
  }, [takenDamage]);

  return (
    <div className={styles.moving} style={{ left: `${position}px` }}>
      <div className={styles.enemyWrapper}>
        <HealthBar health={enemieHealth} lostHealth={enemieHealthLostHealth} />
        <img className={styles.enemy} src="enemy.png" alt="enemy" />
      </div>
    </div>
  );
}

export default Enemie;
