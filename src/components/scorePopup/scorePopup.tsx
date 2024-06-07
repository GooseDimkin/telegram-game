import React, { useEffect, useState } from "react";
import styles from "./scorePopup.module.css";

const ScorePopup = ({ scorePopups, score }) => {
  const [currentY, setCurrentY] = useState(scorePopups && scorePopups.y);

  useEffect(() => {
    const targetY = (scorePopups && scorePopups.y) - 10;
    const distance = targetY - (scorePopups && scorePopups.y);
    const duration = 1000;

    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newY = (scorePopups && scorePopups.y) + distance * progress;
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
