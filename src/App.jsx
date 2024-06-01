import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const Enemy = ({ id, x, y, health, removeEnemy }) => {
  useEffect(() => {
    if (health <= 0) {
      removeEnemy(id);
    }
  }, [health, id, removeEnemy]);

  return (
    <div className={styles.enemy} style={{ top: `${y}%`, right: x }}>
      <div className={styles.healthBar}>
        <div className={styles.health} style={{ width: `${health}%` }} />
      </div>
      <img src="dog.gif" alt="enemy" />
    </div>
  );
};

const App = () => {
  const [enemies, setEnemies] = useState([]);
  const [heroHealth, setHeroHealth] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);

  const windowWidth = window.innerWidth > 730 ? 600 : window.innerWidth - 100;

  useEffect(() => {
    if (heroHealth === 0) {
      setIsGameOver(true);
    }
  }, [heroHealth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prevEnemies) => {
        if (prevEnemies.length === 0) return prevEnemies;

        const updatedEnemies = prevEnemies.map((enemy, index) => {
          if (enemy.x >= windowWidth && index !== 0) {
            return enemy;
          }
          if (enemy.x >= windowWidth && index === 0) {
            return {
              ...enemy,
              health: enemy.health - (isGameOver ? 0 : 10),
            };
          }
          if (index === 0) {
            return {
              ...enemy,
              x: enemy.x + 20,
              health: enemy.health - (isGameOver ? 0 : 10),
            };
          } else {
            return {
              ...enemy,
              x: enemy.x + (isGameOver ? 0 : 20),
            };
          }
        });

        return updatedEnemies;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        const enemyHeight = 80;
        const windowHeight = 160;
        const newEnemy = {
          id: Date.now(),
          x: 0,
          y: windowHeight - enemyHeight - Math.random() * 10,
          health: 100,
        };
        setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        enemies.some(
          (enemy) =>
            enemy.x >= (window.innerWidth > 730 ? windowWidth : windowWidth + 5)
        )
      ) {
        clearInterval(interval);
        setHeroHealth((prevHealth) => prevHealth - 5);
      }
    }, 2000);
  }, [enemies]);

  const removeEnemy = (id) => {
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.game}>
        {isGameOver && (
          <div className={styles.gameOver}>
            <p>Game Over</p>
          </div>
        )}
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
