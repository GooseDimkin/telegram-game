import React, { useEffect, useState } from "react";
import styles from "./projectile.module.css";

const Projectile = ({
  id,
  x,
  y,
  removeProjectile,
  enemies,
  setIsProjectileHit,
}) => {
  const MOBILE_SCREENS = 730;
  const DESKTOP_HERO_COLLISION = 760;
  const MOBILE_HERO_COLLISION = 400;

  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => ({
        x: prevPosition.x + 1,
        y: (enemies[0] && enemies[0].y) + 3,
      }));
    }, 1);

    return () => clearInterval(interval);
  }, [enemies]);

  let enemiesCollision =
    window.innerWidth > MOBILE_SCREENS
      ? DESKTOP_HERO_COLLISION - (enemies[0] && enemies[0].x)
      : MOBILE_HERO_COLLISION - (enemies[0] && enemies[0].x);

  useEffect(() => {
    if (position.x >= enemiesCollision || position.y >= window.innerHeight) {
      setIsProjectileHit(true);
      removeProjectile(id);
    }
  }, [
    position.x,
    position.y,
    removeProjectile,
    id,
    enemiesCollision,
    setIsProjectileHit,
  ]);

  return (
    <img
      src="projectile.gif"
      alt="projectile"
      className={styles.projectile}
      style={{ top: `${position.y}%`, left: `${position.x}px` }}
    />
  );
};

export default Projectile;
