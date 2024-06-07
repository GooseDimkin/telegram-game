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

  return (
    <div>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} {...enemy} removeEnemy={removeEnemy} />
      ))}
    </div>
  );
};

export default Enemies;
