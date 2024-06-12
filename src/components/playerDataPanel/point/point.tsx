import React from "react";
import styles from "./point.module.css";
import { IPoint } from "src/interface/interface";

const Point: React.FC<IPoint> = ({ icon, alt, value }: IPoint) => {
  return (
    <div className={styles.pointWrapper}>
      <img src={icon} alt={alt} />
      <p>{value}</p>
    </div>
  );
};

export default Point;
