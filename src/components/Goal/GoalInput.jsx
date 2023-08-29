import React from "react";
import { useState } from "react";
import styles from "./GoalInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const GoalInput = ({ onGoalSubmit }) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleGoalChange = (e) => {
    setEnteredGoal(e.target.value);
    setIsValid(true);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (enteredGoal.trim() === "") {
      setIsValid(false);
      setEnteredGoal("");
      return;
    }
    setIsValid(true);
    onGoalSubmit(enteredGoal);
    setEnteredGoal("");
  };
  return (
    <form className={styles.container} onSubmit={handleGoalSubmit}>
      <input
        className={
          !isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`
        }
        type="text"
        value={enteredGoal}
        onChange={handleGoalChange}
        placeholder="Set Goal"
      />
      <button className={styles.button} type="submit">
        <FontAwesomeIcon icon={faPlus} color="#1a202c" />
      </button>
    </form>
  );
};

export default GoalInput;