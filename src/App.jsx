import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemieHealth1, setEnemieHealth1] = useState(100);
  const [enemieHealth2, setEnemieHealth2] = useState(100);

  const [playerLostHealth, setPlayerLostHealth] = useState(100);
  const [enemieHealth1LostHealth, setEnemieHealth1LostHealth] = useState(100);
  const [enemieHealth2LostHealth, setEnemieHealth2LostHealth] = useState(100);

  useEffect(() => {
    const decreasePlayerhealth = () => {
      setPlayerHealth(
        (prevCount) =>
          enemieHealth1 !== 0 && enemieHealth2 !== 0 && prevCount - 10
      );
      setPlayerLostHealth((prevState) => prevState - 10);
    };
    const intervalPlayer = setInterval(decreasePlayerhealth, 2000);
    let intervalEnemies;

    const decreaseEnemy1health = () => {
      setEnemieHealth1((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 10;
        } else {
          setEnemieHealth2((prevCount2) => prevCount2 - 5);
          setEnemieHealth2LostHealth((prevState) => prevState - 5);
          return prevCount;
        }
      });
      setEnemieHealth1LostHealth((prevState) => prevState - 10);
    };
    intervalEnemies = setInterval(decreaseEnemy1health, 1000);

    return () => clearInterval(intervalPlayer, intervalEnemies);
  }, []);

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.playerWrapper}>
          <div className={styles.healthBarWrapper}>
            <div className={styles.healthBar} style={{ width: playerHealth }} />
            <div
              className={styles.spenthealthBar}
              style={{ width: playerLostHealth }}
            />
          </div>
          <div className={styles.player} />
        </div>

        <div className={styles.enemiesWrapper}>
          {enemieHealth1 > 0 && (
            <div className={styles.enemyWrapper}>
              <div className={styles.healthBarWrapper}>
                <div
                  className={styles.healthBar}
                  style={{ width: enemieHealth1 }}
                />
                <div
                  className={styles.spenthealthBar}
                  style={{ width: enemieHealth1LostHealth }}
                />
              </div>
              <div className={styles.enemy} />
            </div>
          )}
          {enemieHealth2 > 0 && (
            <div className={styles.enemyWrapper}>
              <div className={styles.healthBarWrapper}>
                <div
                  className={styles.healthBar}
                  style={{ width: enemieHealth2 }}
                />
                <div
                  className={styles.spenthealthBar}
                  style={{ width: enemieHealth2LostHealth }}
                />
              </div>
              <div className={styles.enemy} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
