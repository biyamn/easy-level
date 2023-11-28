import React from 'react';
import styles from './GoalItems.module.css';
import GoalItem from './GoalItem';
import { Carousel } from 'react-bootstrap';

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
    <div className={styles.container}>
      <Carousel fade>
        {goals.map((goal) => {
          if (goal.id === selectedGoal) {
            backgroundColor = ABLED;
          } else {
            backgroundColor = DISABLED;
          }
          console.log(goal.id);
          return (
            <Carousel.Item key={goal.id}>
              <GoalItem
                goal={goal}
                todos={todos}
                onGoalDelete={handleGoalDelete}
                onGoalEdit={handleGoalEdit}
                onSelectGoal={handleSelectedGoal}
                backgroundColor={backgroundColor}
                selectedGoal={selectedGoal}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default GoalItems;
