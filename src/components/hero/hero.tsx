import React from "react";
import HeroHealthBar from "./heroHealthBar/herohealthBar";
import styles from "./hero.module.css";
import { IHero } from "src/interface/interface";

const Hero: React.FC<IHero> = ({ heroHealth }: IHero) => {
  return (
    <div>
      <HeroHealthBar heroHealth={heroHealth} />
      <img src="player.gif" alt="player" className={styles.hero} />
    </div>
  );
};

export default Hero;
