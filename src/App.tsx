import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Enemies from "./components/enemies/enemies.tsx";

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

interface IProjectile {
  id: number;
  x: number;
  y: number;
}

interface IEnemy {
  id: number;
  x: number;
  y: number;
  health: number;
}

interface IScorePopup {
  id: number;
  x: number;
  y: number;
}

const App = () => {
  const windowWidth = window.innerWidth > 730 ? 600 : window.innerWidth - 100;

  const [enemies, setEnemies] = useState<IEnemy[]>([]);
  const [projectiles, setProjectiles] = useState<IProjectile[]>([]);
  const [heroHealth, setHeroHealth] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isProjectileHit, setIsProjectileHit] = useState(false);
  const [scorePopups, setScorePopups] = useState<IScorePopup>();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (heroHealth === 0) {
      setIsGameOver(true);
    }
  }, [heroHealth]);

  useEffect(() => {
    const interval = setInterval(() => {
      throwProjectile();
    }, 500);

    return () => clearInterval(interval);
  }, []);

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

  const removeProjectile = (id) => {
    setProjectiles((prevProjectiles) =>
      prevProjectiles.filter((projectile) => projectile.id !== id)
    );
  };

  const removeEnemy = (id) => {
    setScore((prevEnemies) => prevEnemies + 1);
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
    setScorePopups({ id: Date.now(), x: enemies[0].x - 50, y: enemies[0].y });
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
        <img src="player.gif" alt="player" className={styles.hero} />
        <Enemies
          enemies={enemies}
          setEnemies={setEnemies}
          isProjectileHit={isProjectileHit}
          isGameOver={isGameOver}
          removeEnemy={removeEnemy}
          windowWidth={windowWidth}
        />
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
