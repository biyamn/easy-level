import { useState } from 'react';
import styles from './TodoInput.module.css'

const TodoInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalChangeHandler = (e) => {
    setEnteredGoal(e.target.value);
    setIsValid(true);
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredGoal === '') {
      setIsValid(false);
      return;
    }
    setIsValid(true);

    const enteredGoalArray = {
      id: Math.random(),
      text: enteredGoal
    }

    props.onSaveGoal(enteredGoalArray)
    setEnteredGoal('');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <input className={!isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
          type='text' 
          value={enteredGoal} 
          onChange={goalChangeHandler} 
        />
        <button className={styles.button} type='submit'>추가</button>
      </form>
    </div>
  );
};

export default TodoInput;