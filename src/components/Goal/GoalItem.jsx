import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import styles from "./GoalItem.module.css";

const GoalItem = ({ goal, onGoalDelete, onGoalEdit, onGoalCheck }) => {
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
    onGoalEdit(updatedText, goal.id);
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
    onGoalDelete(id);
  };

  const onCheck = (id) => {
    onGoalCheck(id);
  };

  const isChecked = goal.isFinished;

  return (
    <Container>
      <div className={styles.checkboxAndText}>
        <label>
          <input
            type="checkbox"
            onChange={() => onCheck(goal.id)}
            checked={goal.isFinished}
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
            placeholder={goal.text}
          />
        ) : (
          <div
            className={
              isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
            }
          >
            {goal.text}
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
              onClick={() => onDelete(goal.id)}
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
    </Container>
  );
};

const Container = styled.div`
  background-color: #a8dcfa;
  border-radius: 8px;
  padding: 5%;
  width: 15rem;
  height: 10rem;
  margin-bottom: 5%;
  margin-right: 5%;
`;

const Title = styled.div`
  font-size: 1rem;
  color: #1a202c;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export default GoalItem;
