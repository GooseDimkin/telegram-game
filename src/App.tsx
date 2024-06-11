import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Enemies from "./components/enemies/enemies";
import Projectiles from "./components/projectiles/projectiles";
import Hero from "./components/hero/hero";
import ScorePopup from "./components/scorePopup/scorePopup";
import { IEnemy, IScorePopup } from "./interface/interface";

const App = () => {
  const MOBILE_SCREEN = 730;
  const windowWidth =
    window.innerWidth > MOBILE_SCREEN ? 600 : window.innerWidth - 100;

  const ENEMY_DAMAGE = 35;
  const ENEMY_MOVEMENT_SPEED = 50;
  const ENEMY_HIGHT = 80;
  const WINDOW_HEIGHT = 160;
  const ENEMY_SPAWN_COORDINATES = -80;

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

  // Hero getting damage from enemies
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        enemies.some(
          (enemy) =>
            enemy.x >=
            (window.innerWidth > MOBILE_SCREEN ? windowWidth : windowWidth + 5)
        )
      ) {
        clearInterval(interval);
        setHeroHealth((prevHealth) => prevHealth - 5);
      }
    }, 2000);
  }, [enemies, windowWidth]);

  // Enemies movement
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
              health: enemy.health - (isGameOver ? 0 : ENEMY_DAMAGE),
            };
          }
          if (isProjectileHit && index === 0) {
            return {
              ...enemy,
              x: enemy.x + 50,
              health: enemy.health - (isGameOver ? 0 : ENEMY_DAMAGE),
            };
          } else {
            return {
              ...enemy,
              x: enemy.x + (isGameOver ? 0 : ENEMY_MOVEMENT_SPEED),
            };
          }
        });

        return updatedEnemies;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isGameOver, isProjectileHit, setEnemies, windowWidth]);

  // Spawn enemies
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        const newEnemy = {
          id: Date.now(),
          x: ENEMY_SPAWN_COORDINATES,
          y: WINDOW_HEIGHT - ENEMY_HIGHT - Math.random() * 10,
          health: 100,
        };
        setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, setEnemies]);

  const removeEnemy = (id: number) => {
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
        <Enemies enemies={enemies} removeEnemy={removeEnemy} />
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
