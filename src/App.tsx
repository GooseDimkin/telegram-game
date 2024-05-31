import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Player from "./heroes/player/player.tsx";
import Enemie from "./heroes/emeny/enemy.tsx";

function App() {
  const [enemieTakenDamage, setEnemieTakenDamage] = useState(0);
  const [position, setPosition] = useState(800);

  // const setEnemieTakenDamageFoo = (damage: number) => {
  //   setEnemieTakenDamage(damage);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev > 0 ? prev - 10 : 800));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.outerWrapper}>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: "background.jpg" }}
      >
        <Player />
        <Enemie takenDamage={enemieTakenDamage} position={position} />
      </div>
    </div>
  );
}

export default App;
