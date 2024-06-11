import React from "react";
import Enemy from "./enemy/enemy";
import { IEnemies, IEnemy } from "src/interface/interface";

const Enemies: React.FC<IEnemies> = ({
  enemies,
  removeEnemy,
  skin,
  currentVawe,
}: IEnemies) => {
  return (
    <div>
      {enemies.map((enemy: IEnemy) => (
        <Enemy
          key={enemy.id}
          {...enemy}
          removeEnemy={removeEnemy}
          skin={skin}
          currentVawe={currentVawe}
        />
      ))}
    </div>
  );
};

export default Enemies;
