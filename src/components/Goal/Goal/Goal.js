import { useState } from 'react';
import styles from './Goal.module.css'
import GoalInput from '../GoalInput/GoalInput';
import GoalTitle from '../GoalTitle/GoalTitle';

const Goal = () => {
  const [displayInputs, setDisplayInputs] = useState([]);

  const onSaveGoal = (goal) => {
    setDisplayInputs(goal);
  }
  console.log(displayInputs)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Goal</h1>
      <GoalInput onSaveGoal={onSaveGoal}/>
      <GoalTitle input={displayInputs}/>
    </div>
  );
};

export default Goal;