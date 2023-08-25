import React from "react";
import { useState } from "react";
import styles from "./TodoInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoInput = (props) => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalChangeHandler = (e) => {
    setEnteredTodo(e.target.value);
    setIsValid(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredTodo.trim() === "") {
      setIsValid(false);
      setEnteredTodo("");
      return;
    }
    setIsValid(true);

    const enteredTodoArray = {
      id: Math.random(),
      text: enteredTodo,
    };

    props.onSaveTodo(enteredTodoArray);
    setEnteredTodo("");
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <input
        className={
          !isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`
        }
        type="text"
        value={enteredTodo}
        onChange={goalChangeHandler}
        placeholder="Add Todo"
      />
      <button className={styles.button} type="submit">
        <FontAwesomeIcon icon={faPlus} color="#1a202c" />
      </button>
    </form>
  );
};

export default TodoInput;
