import React, { useEffect, useState } from "react";
import styles from "./player.module.css";
import HealthBar from "../../elements/healthBar/healthBar.tsx";

function Player() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerLostHealth, setPlayerLostHealth] = useState(100);

  const DAMAGE = 0;

  useEffect(() => {
    const decreasePlayerhealth = () => {
      setPlayerHealth((prevCount) => prevCount - DAMAGE);
      setPlayerLostHealth((prevState) => prevState - DAMAGE);
    };
    const intervalPlayer = setInterval(decreasePlayerhealth, 2000);
    return () => clearInterval(intervalPlayer);
  }, []);

  return (
    <div className={styles.playerWrapper}>
      <HealthBar health={playerHealth} lostHealth={playerLostHealth} player />
      <img className={styles.player} src="player.png" alt="player" />
    </div>
  );
}

export default Player;
