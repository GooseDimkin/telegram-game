import React from "react";
import styles from "./App.module.css";
import Player from "./heroes/player/player.tsx";
import Enemie from "./heroes/emenie/enemie.tsx";

function App() {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <Player />
        <div className={styles.enemiesWrapper}>
          <Enemie />
          {/* <Enemie /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
