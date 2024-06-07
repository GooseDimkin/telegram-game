import React, { useEffect, useState } from "react";
import Projectile from "./projectile/projectile.tsx";

interface IProjectile {
  id: number;
  x: number;
  y: number;
}

const Projectiles = ({ setIsProjectileHit, enemies }) => {
  const [projectiles, setProjectiles] = useState<IProjectile[]>([]);

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
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {projectiles.map((projectile) => (
        <Projectile
          key={projectile.id}
          {...projectile}
          removeProjectile={removeProjectile}
          enemies={enemies}
          setIsProjectileHit={setIsProjectileHit}
        />
      ))}
    </div>
  );
};

export default Projectiles;
