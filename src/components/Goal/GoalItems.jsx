import React from "react";
import styles from "./GoalItems.module.css";
import GoalItem from "./GoalItem";

const GoalItems = ({
  goals,
  onGoalDelete,
  onGoalEdit,
  onGoalCheck,
  onSelectGoal,
}) => {
  const handleGoalDelete = (id) => onGoalDelete(id);

  const handleGoalEdit = (updatedText, id) => onGoalEdit(updatedText, id);

  const handleGoalCheck = (id) => onGoalCheck(id);

  const handleSelectedGoal = (id) => onSelectGoal(id);

  return (
    <div className={styles.container}>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onGoalDelete={handleGoalDelete}
          onGoalEdit={handleGoalEdit}
          onGoalCheck={handleGoalCheck}
          onSelectGoal={handleSelectedGoal}
        />
      ))}
    </div>
  );
};

export default GoalItems;
