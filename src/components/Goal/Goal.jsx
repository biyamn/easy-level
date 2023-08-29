import React from "react";
import styles from "./Goal.module.css";
import GoalInput from "./GoalInput";
import GoalTitle from "./GoalTitle";

const Goal = ({ goals, setGoals }) => {
  const handleGoalSubmit = (goal) => {
    setGoals(goal);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Goal</h1>
      <GoalInput onGoalSubmit={handleGoalSubmit} />
      <GoalTitle input={goals} />
    </div>
  );
};

export default Goal;
