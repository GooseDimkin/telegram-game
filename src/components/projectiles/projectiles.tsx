import React, { useEffect, useState } from "react";
import Projectile from "./projectile/projectile";
import { IProjectile, IProjectiles } from "../../interface/interface";

const Projectiles: React.FC<IProjectiles> = ({
  setIsProjectileHit,
  enemies,
}: IProjectiles) => {
  const [projectiles, setProjectiles] = useState<IProjectile[]>([]);

  const removeProjectile = (id: number) => {
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
    setProjectiles((prevProjectiles: any) => [
      ...prevProjectiles,
      newProjectile,
    ]);
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
