import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const Enemy = ({ id, x, y, health, removeEnemy }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      removeEnemy(id);
    }, 10000);
    return () => clearInterval(interval);
  }, [id, removeEnemy]);

  useEffect(() => {
    if (health <= 0) {
      removeEnemy(id);
    }
  }, [health, id, removeEnemy]);

  return (
    <div className={styles.enemy} style={{ top: y, right: x }}>
      <div className={styles.healthBar}>
        <div className={styles.health} style={{ width: `${health}%` }}/>
      </div>
      <img src="enemy.png" alt="enemie"/>
    </div>
  );
};

const App = () => {
  const [enemies, setEnemies] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) => ({
          ...enemy,
          x: enemy.x + 100,
          health: enemy.health - 10,
        }))
      );
    }, 1000);
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

  const removeEnemy = (id) => {
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.game}>
        <img src="player.png" alt="player" className={styles.hero}/>
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} {...enemy} removeEnemy={removeEnemy} />
        ))}
      </div>
    </div>
  );
};

export default App;
