import React from "react";
import styles from "./GoalItems.module.css";

const GoalItems = ({ goals }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{goals}</div>
    </div>
  );
};

export default GoalItems;
