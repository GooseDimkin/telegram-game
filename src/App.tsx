import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Enemies from "./components/enemies/enemies.tsx";
import Projectiles from "./components/projectiles/projectiles.tsx";

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
    setScore((prevEnemies) => prevEnemies + 1);
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
    setScorePopups({ id: Date.now(), x: enemies[0].x - 50, y: enemies[0].y });
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
        <Projectiles
          setIsProjectileHit={setIsProjectileHit}
          enemies={enemies}
        />
        <ScorePopup scorePopups={scorePopups} score={score} />
      </div>
    </div>
  );
};

export default App;
