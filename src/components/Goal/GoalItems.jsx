import React from "react";
import styles from "./GoalItems.module.css";
import GoalItem from "./GoalItem";

const GoalItems = ({ goals, onGoalDelete, onGoalEdit, onGoalCheck }) => {
  const handleGoalDelete = (id) => onGoalDelete(id);

  const handleGoalEdit = (updatedText, id) => onGoalEdit(updatedText, id);

  const handleGoalCheck = (id) => onGoalCheck(id);

  return (
    <div className={styles.container}>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onGoalDelete={handleGoalDelete}
          onGoalEdit={handleGoalEdit}
          onGoalCheck={handleGoalCheck}
        />
      ))}
    </div>
  );
};

export default GoalItems;
