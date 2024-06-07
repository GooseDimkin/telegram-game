import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Enemies from "./components/enemies/enemies.tsx";
import Projectiles from "./components/projectiles/projectiles.tsx";
import Hero from "./components/hero/hero.tsx";
import ScorePopup from "./components/scorePopup/scorePopup.tsx";
import { IEnemy, IScorePopup } from "./interface/interface.tsx";

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
  }, [enemies, windowWidth]);

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
        <Hero heroHealth={heroHealth} />
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
