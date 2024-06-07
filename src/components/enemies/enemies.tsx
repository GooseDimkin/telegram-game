import React, { useEffect } from "react";
import Enemy from "./enemy/enemy.tsx";

const Enemies = ({
  enemies,
  setEnemies,
  isProjectileHit,
  isGameOver,
  removeEnemy,
  windowWidth,
}) => {
  const ENEMY_DAMAGE = 35;
  const ENEMY_MOVEMENT_SPEED = 50;
  const ENEMY_HIGHT = 80;
  const WINDOW_HEIGHT = 160;
  const ENEMY_SPAWN_COORDINATES = -80;

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

  return (
    <div>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} {...enemy} removeEnemy={removeEnemy} />
      ))}
    </div>
  );
};

export default Enemies;
