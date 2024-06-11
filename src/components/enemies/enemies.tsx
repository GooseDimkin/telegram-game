import React from "react";
import Enemy from "./enemy/enemy";
import { IEnemies, IEnemy } from "src/interface/interface";

const Enemies: React.FC<IEnemies> = ({
  enemies,
  removeEnemy,
  skin,
  currentWave,
}: IEnemies) => {
  return (
    <div>
      {enemies.map((enemy: IEnemy) => (
        <Enemy
          key={enemy.id}
          {...enemy}
          removeEnemy={removeEnemy}
          skin={skin}
          currentWave={currentWave}
        />
      ))}
    </div>
  );
};

export default Enemies;
