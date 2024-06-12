import React from "react";
import styles from "./playerDataPanel.module.css";
import { IPlayerDataPanel } from "src/interface/interface";
import Point from "./point/point";

const PlayerDataPanel: React.FC<IPlayerDataPanel> = ({
  score,
}: IPlayerDataPanel) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarOuterWrapper}>
        <div className={styles.avatarWrapper}></div>
      </div>
      <div className={styles.playerDataWrapper}>
        <div className={styles.playerDataInnerWrapper}>
          <div className={styles.nicknameWrapper}>
            <p>nickname</p>
            <div className={styles.playerDataBorder} />
          </div>
          <div className={styles.scoreProgressBar}>
            <div className={styles.scoreProgressWrapper}>
              <div
                className={styles.scoreProgress}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <div className={styles.pointsWrapper}>
            <Point icon="point1.svg" alt="point1" value="5000" />
            <Point icon="point2.svg" alt="point2" value="300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDataPanel;
