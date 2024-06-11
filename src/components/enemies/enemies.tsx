import React from "react";
import Enemy from "./enemy/enemy.tsx";

const Enemies = ({ enemies, removeEnemy }) => {
  return (
    <div>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} {...enemy} removeEnemy={removeEnemy} />
      ))}
    </div>
  );
};

export default Enemies;
