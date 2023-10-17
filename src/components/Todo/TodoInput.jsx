import React from "react";
import { useState } from "react";
import styles from "./TodoInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoInput = ({ onTodoSubmit, isChangeBlocked }) => {
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

    onTodoSubmit(enteredTodo);
    setEnteredTodo("");
  };

  console.log("isChangeBlocked", isChangeBlocked);
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          className={
            !isValid ? `${styles.input} ${styles.invalid}` : `${styles.input}`
          }
          type="text"
          value={enteredTodo}
          onChange={goalChangeHandler}
          placeholder="예상 질문을 추가해 주세요."
          disabled={isChangeBlocked}
        />
        <button
          className={styles.button}
          type="submit"
          disabled={isChangeBlocked}
        >
          <FontAwesomeIcon icon={faPlus} color="#1a202c" />
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
