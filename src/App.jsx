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

const Projectile = ({
  id,
  x,
  y,
  removeProjectile,
  enemies,
  setIsProjectileHit,
}) => {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const interval = setInterval(() => {
      const enemyHeight = 80;
      const windowHeight = 160;
      setPosition((prevPosition) => ({
        x: prevPosition.x + 1,
        y: (enemies[0] && enemies[0].y) + 3,
      }));
    }, 1);

    return () => clearInterval(interval);
  }, []);

  let enemiesCollision =
    window.innerWidth > 730
      ? 760 - (enemies[0] && enemies[0].x)
      : 400 - (enemies[0] && enemies[0].x);

  useEffect(() => {
    if (position.x >= enemiesCollision || position.y >= window.innerHeight) {
      setIsProjectileHit(true);
      removeProjectile(id);
    }
  }, [position.x, position.y, removeProjectile, id]);

  return (
    <img
      src="projectile.gif"
      alt="projectile"
      className={styles.projectile}
      style={{ top: `${position.y}%`, left: `${position.x}px` }}
    />
  );
};

const ScorePopup = ({ scorePopups, score }) => {
  const [currentY, setCurrentY] = useState(scorePopups && scorePopups.y);

  useEffect(() => {
    const targetY = (scorePopups && scorePopups.y) - 10;
    const distance = targetY - (scorePopups && scorePopups.y);
    const duration = 1000;

    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newY = (scorePopups && scorePopups.y) + distance * progress;
      setCurrentY(newY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      setCurrentY(scorePopups && scorePopups.y);
    };
  }, [scorePopups]);

  return (
    <div
      className={styles.scorePopup}
      style={{ top: `${currentY}%`, right: scorePopups && scorePopups.x }}
    >
      {score !== 0 && `+${score}`}
    </div>
  );
};

const App = () => {
  const [enemies, setEnemies] = useState([]);
  const [projectiles, setProjectiles] = useState([]);
  const [heroHealth, setHeroHealth] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isProjectileHit, setIsProjectileHit] = useState(false);
  const [scorePopups, setScorePopups] = useState();
  const [score, setScore] = useState(0);

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
          if (isProjectileHit && enemy.x >= windowWidth && index === 0) {
            return {
              ...enemy,
              health: enemy.health - (isGameOver ? 0 : 35),
            };
          }
          if (isProjectileHit && index === 0) {
            return {
              ...enemy,
              x: enemy.x + 50,
              health: enemy.health - (isGameOver ? 0 : 35),
            };
          } else {
            return {
              ...enemy,
              x: enemy.x + (isGameOver ? 0 : 50),
            };
          }
        });

        return updatedEnemies;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isGameOver, isProjectileHit]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        const enemyHeight = 80;
        const windowHeight = 160;
        const newEnemy = {
          id: Date.now(),
          x: -80,
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

  useEffect(() => {
    const interval = setInterval(() => {
      throwProjectile();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const removeEnemy = (id) => {
    setScore((prevEnemies) => prevEnemies + 1);
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
    setScorePopups({ id: Date.now(), x: enemies[0].x - 50, y: enemies[0].y });
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
            enemies={enemies}
            setIsProjectileHit={setIsProjectileHit}
          />
        ))}
        <ScorePopup scorePopups={scorePopups} score={score} />
      </div>
    </div>
  );
};

export default App;
