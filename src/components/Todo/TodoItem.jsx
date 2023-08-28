import React from "react";
import styles from "./TodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const TodoItem = ({ todo, onTodoDelete, onTodoEdit, onTodoCheck }) => {
  const editedText = useRef(null);

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const submitEditedContent = () => {
    if (updatedText === "") {
      setIsEditClicked(false);
      return;
    }

    setUpdatedText("");
    setIsEditClicked(false);
    onTodoEdit(updatedText, todo.id);
  };

  const openEdit = () => {
    setIsEditClicked(true);
    editedText.current?.focus();
  };

  const openDelete = () => {
    setIsDeleteClicked(true);
  };

  const cancelEdit = () => {
    setUpdatedText("");
    setIsEditClicked(false);
  };

  const cancelDelete = () => {
    setIsDeleteClicked(false);
  };

  const onDelete = (id) => {
    onTodoDelete(id);
  };

  const onCheck = (id) => {
    onTodoCheck(id);
  };

  const isChecked = todo.isFinished;
  return (
    <div className={styles.container}>
      <div className={styles.checkboxAndText}>
        <label>
          <input
            type="checkbox"
            onChange={() => onCheck(todo.id)}
            checked={todo.isFinished}
          />
          <div>
            <FontAwesomeIcon
              icon={faCheck}
              color="#1a202c"
              className={styles.checkIcon}
            />
          </div>
        </label>
        {isEditClicked ? (
          <input
            className={
              isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
            }
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            ref={editedText}
            placeholder={todo.text}
          />
        ) : (
          <div
            className={
              isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
            }
          >
            {todo.text}
          </div>
        )}
      </div>
      <div className={styles.actionBtns}>
        {isEditClicked && !isDeleteClicked ? (
          <>
            <button className={styles.submitIcon} onClick={submitEditedContent}>
              <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
            </button>
            <button className={styles.cancelIcon} onClick={cancelEdit}>
              <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
            </button>
          </>
        ) : !isEditClicked && isDeleteClicked ? (
          <>
            <button
              className={styles.submitIcon}
              onClick={() => onDelete(todo.id)}
            >
              <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
            </button>
            <button className={styles.cancelIcon} onClick={cancelDelete}>
              <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
            </button>
          </>
        ) : (
          <>
            <button className={styles.editIcon} onClick={openEdit}>
              <FontAwesomeIcon icon={faPenToSquare} size="2x" color="white" />
            </button>
            <button className={styles.deleteIcon} onClick={openDelete}>
              <FontAwesomeIcon icon={faTrashCan} size="2x" color="white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
