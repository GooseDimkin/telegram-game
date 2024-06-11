import React, { useEffect, useState } from "react";
import styles from "./scorePopup.module.css";
import { IScorePopup, IScorePopupComponent } from "src/interface/interface";

const ScorePopup: React.FC<IScorePopupComponent> = ({
  scorePopups,
  score,
}: IScorePopupComponent) => {
  const [currentY, setCurrentY] = useState(scorePopups && scorePopups.y);

  useEffect(() => {
    const TARGET_Y =
      ((scorePopups as IScorePopup) && (scorePopups as IScorePopup).y) - 10;
    const DISTANCE =
      TARGET_Y -
      ((scorePopups as IScorePopup) && (scorePopups as IScorePopup).y);
    const DURATION = 1000;

    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / DURATION, 1);
      const newY =
        ((scorePopups as IScorePopup) && (scorePopups as IScorePopup).y) +
        DISTANCE * progress;
      setCurrentY(newY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      setCurrentY(scorePopups && scorePopups.y);
    };
  }, [scorePopups]);

  return (
    <div
      className={styles.scorePopup}
      style={{ top: `${currentY}%`, right: scorePopups && scorePopups.x }}
    >
      {score !== 0 && `+${score}`}
    </div>
  );
};

export default ScorePopup;
