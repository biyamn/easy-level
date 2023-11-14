import React from 'react';
import { useState } from 'react';
import styles from './GoalInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const GoalInput = ({ onGoalSubmit }) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleGoalChange = (e) => {
    setEnteredGoal(e.target.value);
    setIsValid(true);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (enteredGoal.trim() === '') {
      setIsValid(false);
      setEnteredGoal('');
      return;
    }
    setIsValid(true);

    console.log(selectedInterviewType, enteredGoal);
    onGoalSubmit(selectedInterviewType, enteredGoal);
    setEnteredGoal('');
    setSelectedInterviewType(interviewTypes[0].value);
  };

  const interviewTypes = [
    { value: '기술면접' },
    { value: '인성면접' },
    { value: '기타' },
  ];

  const [selectedInterviewType, setSelectedInterviewType] = useState(
    interviewTypes[0].value
  );

  const Select = () => {
    const handleChange = (e) => {
      setSelectedInterviewType(e.target.value);
    };
    return (
      <>
        <select onChange={handleChange}>
          {interviewTypes.map((interviewType) => (
            <option key={interviewType.value} value={interviewType.value}>
              {interviewType.value}
            </option>
          ))}
        </select>
      </>
    );
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleGoalSubmit}>
        <Select />
        <input
          className={
            !isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`
          }
          type="text"
          value={enteredGoal}
          onChange={handleGoalChange}
          placeholder="면접 종류를 추가해 주세요."
        />
        <button className={styles.button} type="submit">
          <FontAwesomeIcon icon={faPlus} color="#1a202c" />
        </button>
      </form>
    </div>
  );
};

export default GoalInput;
