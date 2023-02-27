import { useState } from 'react';
import styles from './TodoInput.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalChangeHandler = (e) => {
    setEnteredGoal(e.target.value);
    setIsValid(true);
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredGoal.trim() === '') {
      setIsValid(false);
      setEnteredGoal('');
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
    <form className={styles.container} onSubmit={submitHandler}>
      <input className={!isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
        type='text' 
        value={enteredGoal} 
        onChange={goalChangeHandler} 
        placeholder='Add Todo'
      />
      <button className={styles.button} type='submit'><FontAwesomeIcon icon={faPlus} color="#1a202c"/></button>
    </form>
  );
};

export default TodoInput;