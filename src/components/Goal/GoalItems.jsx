import React from "react";
import styles from "./GoalItems.module.css";
import GoalItem from "./GoalItem";

const GoalItems = ({ goals }) => {
  return (
    <div className={styles.container}>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalItems;
