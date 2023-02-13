import { useState } from 'react';
import styles from './Goal.module.css'
import GoalInput from '../GoalInput/GoalInput';
import GoalTitle from '../GoalTitle/GoalTitle';

const Goal = () => {
  const [displayInputs, setDisplayInputs] = useState([]);

  const onSaveGoal = (goal) => {
    setDisplayInputs([...displayInputs, goal]);
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>이루고 싶은<br/>목표를 입력해주세요!</h1>
      <GoalInput onSaveGoal={onSaveGoal}/>
      <GoalTitle input={displayInputs}/>
    </div>
  );
};

export default Goal;