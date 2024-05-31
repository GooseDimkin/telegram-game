import React, { useEffect, useState } from "react";
import styles from "./player.module.css";
import HealthBar from "../../elements/healthBar/healthBar.tsx";

function Player() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerLostHealth, setPlayerLostHealth] = useState(100);

  useEffect(() => {
    const decreasePlayerhealth = () => {
      setPlayerHealth((prevCount) => prevCount - 10);
      setPlayerLostHealth((prevState) => prevState - 10);
    };
    const intervalPlayer = setInterval(decreasePlayerhealth, 2000);
    return () => clearInterval(intervalPlayer);
  }, []);

  return (
    <div className={styles.playerWrapper}>
      <HealthBar health={playerHealth} lostHealth={playerLostHealth} />
      <div className={styles.player} />
    </div>
  );
}

export default Player;
