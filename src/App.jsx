import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const Enemy = ({ id, x, y, health, removeEnemy }) => {
  useEffect(() => {
    if (health <= 0) {
      removeEnemy(id);
    }
  }, [health, id, removeEnemy]);

  return (
    <div className={styles.enemy} style={{ top: y, right: x }}>
      <div className={styles.healthBar}>
        <div className={styles.health} style={{ width: `${health}%` }} />
      </div>
      <img src="enemy.png" alt="enemy" />
    </div>
  );
};

const App = () => {
  const [enemies, setEnemies] = useState([]);
  const [heroHealth, setHeroHealth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prevEnemies) => {
        if (prevEnemies.length === 0) return prevEnemies;

        const updatedEnemies = prevEnemies.map((enemy, index) => {
          if (enemy.x >= 600) {
            return enemy;
          }
          if (index === 0) {
            return {
              ...enemy,
              x: enemy.x + 20,
              health: enemy.health - 10,
            };
          } else {
            return {
              ...enemy,
              x: enemy.x + 20,
            };
          }
        });

        return updatedEnemies;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const windowHeight = 950;
      const newEnemy = {
        id: Date.now(),
        x: 0,
        y: windowHeight / 2 + Math.random() * 100 - 50,
        health: 100,
      };
      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (enemies.some((enemy) => enemy.x >= 600)) {
        clearInterval(interval);
        setHeroHealth((prevHealth) => prevHealth - 10);
      }
    }, 500);
  }, [enemies]);

  const removeEnemy = (id) => {
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.game}>
        <div className={styles.heroHealthBar}>
          <div
            className={`${styles.health} ${heroHealth <= 30 && styles.low}`}
            style={{ width: `${heroHealth}%` }}
          />
        </div>
        <img src="player.png" alt="player" className={styles.hero} />
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} {...enemy} removeEnemy={removeEnemy} />
        ))}
      </div>
    </div>
  );
};

export default App;
