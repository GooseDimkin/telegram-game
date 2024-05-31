import React, { useState } from "react";
import styles from "./App.module.css";
import Player from "./heroes/player/player.tsx";
import Enemie from "./heroes/emeny/enemy.tsx";

function App() {
  const [enemieTakenDamage, setEnemieTakenDamage] = useState(0);

  const setEnemieTakenDamageFoo = (damage: number) => {
    setEnemieTakenDamage(damage);
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper} style={{ backgroundImage: 'background.jpg' }}>
        <Player />
        <div className={styles.enemiesWrapper}>
          <Enemie takenDamage={enemieTakenDamage} />
          {/* <Enemie takenDamage={enemieTakenDamage} /> */}
        </div>
        <button
          onClick={() => setEnemieTakenDamageFoo(7)}
          className={styles.button}
        >
          Sword
        </button>
        <button
          onClick={() => setEnemieTakenDamageFoo(20)}
          className={styles.button}
        >
          AWP
        </button>
      </div>
    </div>
  );
}

export default App;
