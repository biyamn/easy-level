import React from "react";
import styles from "./GoalTitle.module.css";

const GoalTitle = ({ goals }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{goals}</div>
    </div>
  );
};

export default GoalTitle;
