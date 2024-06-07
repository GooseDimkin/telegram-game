import React from "react";
import HeroHealthBar from "./heroHealthBar/herohealthBar.tsx";
import styles from "./hero.module.css";

const Hero = ({ heroHealth }) => {
  return (
    <div>
      <HeroHealthBar heroHealth={heroHealth} />
      <img src="player.gif" alt="player" className={styles.hero} />
    </div>
  );
};

export default Hero;
