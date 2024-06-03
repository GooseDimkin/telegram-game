// App.js
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

const Projectile = ({ id, x, y, removeProjectile }) => {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => ({
        x: prevPosition.x + 1,
        y: prevPosition.y + 0.01,
      }));
    }, 1);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (position.x >= window.innerWidth || position.y >= window.innerHeight) {
      removeProjectile(id);
    }
  }, [position.x, position.y, removeProjectile, id]);

  return (
    <img
      src="projectile.gif"
      alt="projectile"
      className={styles.projectile}
      style={{ top: `${position.y - 475}%`, left: `${position.x}px` }}
    />
  );
};

const App = () => {
  const [enemies, setEnemies] = useState([]);
  const [projectiles, setProjectiles] = useState([]);
  const [heroHealth, setHeroHealth] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);

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
          if (enemy.x >= window.innerWidth && index !== 0) {
            return enemy;
          }
          if (enemy.x >= window.innerWidth && index === 0) {
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
            enemy.x >=
            (window.innerWidth > 730
              ? window.innerWidth - 100
              : window.innerWidth - 95)
        )
      ) {
        clearInterval(interval);
        setHeroHealth((prevHealth) => prevHealth - 5);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [enemies]);

  const removeEnemy = (id) => {
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
  };

  const removeProjectile = (id) => {
    setProjectiles((prevProjectiles) =>
      prevProjectiles.filter((projectile) => projectile.id !== id)
    );
  };

  const throwProjectile = () => {
    const newProjectile = {
      id: Date.now(),
      x: 100,
      y: 550,
    };
    setProjectiles((prevProjectiles) => [...prevProjectiles, newProjectile]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      throwProjectile();
    }, 1000); // Выстрел каждую секунду (1000 миллисекунд)

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, []);

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
        {projectiles.map((projectile) => (
          <Projectile
            key={projectile.id}
            {...projectile}
            removeProjectile={removeProjectile}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
