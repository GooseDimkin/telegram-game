import React from "react";
import styles from "./herohealthBar.module.css";
import { IHeroHealthBar } from "src/interface/interface";

const HeroHealthBar: React.FC<IHeroHealthBar> = ({
  heroHealth,
}: IHeroHealthBar) => {
  return (
    <div className={styles.heroHealthBar}>
      <div
        className={`${styles.health} ${heroHealth <= 30 && styles.low}`}
        style={{ width: `${heroHealth}%` }}
      />
    </div>
  );
};

export default HeroHealthBar;
