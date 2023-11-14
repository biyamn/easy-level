import React from 'react';
import { useState } from 'react';
import styles from './GoalInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const options = [
  { value: '기술면접' },
  { value: '인성면접' },
  { value: '포트폴리오' },
  { value: '기타' },
];

const GoalInput = ({ onGoalSubmit }) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [selectedOption, setSelectedOption] = useState(options[0].value);

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
    console.log(selectedOption, enteredGoal);
    onGoalSubmit(selectedOption, enteredGoal);
    setEnteredGoal('');
    setSelectedOption(options[0].value);
  };

  const Select = () => {
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
      console.log(e.target.value);
    };

    return (
      <select onChange={handleChange} value={selectedOption}>
        {options.map((option) => (
          <option key={option.value}>{option.value}</option>
        ))}
      </select>
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
