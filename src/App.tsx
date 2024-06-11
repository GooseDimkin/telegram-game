import React, { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";
import Enemies from "./components/enemies/enemies";
import Projectiles from "./components/projectiles/projectiles";
import Hero from "./components/hero/hero";
import ScorePopup from "./components/scorePopup/scorePopup";
import { IEnemy, IScorePopup } from "./interface/interface";
import enemiesJson from "./enemies.json";

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
  const [currentVawe, setCurrentVawe] = useState<number>(0);

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

  const isFirstRender = useRef(true);

  // Spawn enemies
  useEffect(() => {
    if (isFirstRender.current) {
      const enemiesCount = (enemiesJson as any)[currentVawe].enemiesCount;

      for (let i = 0; i < enemiesCount; ++i) {
        setTimeout(() => {
          const newEnemy = {
            id: Date.now() + i,
            x: ENEMY_SPAWN_COORDINATES,
            y: WINDOW_HEIGHT - ENEMY_HIGHT - Math.random() * 10,
            health: (enemiesJson as any)[currentVawe].health,
            skin: (enemiesJson as any)[currentVawe].skin,
          };
          setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
        }, i * 1000);
      }
      isFirstRender.current = false;
    }
  }, [enemiesJson, setEnemies, currentVawe, isFirstRender]);

  const removeEnemy = (id: number) => {
    setScore((prevEnemies) => prevEnemies + 1);
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== id));
    setScorePopups({ id: Date.now(), x: enemies[0].x - 50, y: enemies[0].y });

    if (enemies.length <= 1) {
      isFirstRender.current = true;
      setCurrentVawe((prevVawe) => prevVawe + 1);
    }
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.game}>
        {isGameOver && (
          <div className={styles.gameOver}>
            <p>Game Over</p>
          </div>
        )}
        {currentVawe > 0 && (
          <div className={styles.vawesCounter}>
            <p>{currentVawe}</p>
          </div>
        )}
        <Hero heroHealth={heroHealth} />
        <Enemies
          enemies={enemies}
          removeEnemy={removeEnemy}
          skin={(enemiesJson as any)[currentVawe].skin}
          currentVawe={currentVawe}
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
