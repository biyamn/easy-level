import React from 'react';
import styles from './GoalItems.module.css';
import GoalItem from './GoalItem';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const GoalItems = ({
  goals,
  onGoalDelete,
  onGoalEdit,
  onSelectGoal,
  selectedGoal,
  todos,
}) => {
  const handleGoalDelete = (id) => onGoalDelete(id);

  const handleGoalEdit = (updatedText, id) => onGoalEdit(updatedText, id);

  const handleSelectedGoal = (id) => onSelectGoal(id);

  const DISABLED = '#adb3bb';
  const ABLED = '#a8dcfa';
  let backgroundColor = DISABLED;

  return (
    <Carousel>
      <div className={styles.container}>
        {goals.map((goal) => {
          if (goal.id === selectedGoal) {
            backgroundColor = ABLED;
          } else {
            backgroundColor = DISABLED;
          }
          return (
            <GoalItem
              key={goal.id}
              goal={goal}
              todos={todos}
              onGoalDelete={handleGoalDelete}
              onGoalEdit={handleGoalEdit}
              onSelectGoal={handleSelectedGoal}
              backgroundColor={backgroundColor}
              selectedGoal={selectedGoal}
            />
          );
        })}
      </div>
    </Carousel>
  );
};

export default GoalItems;
