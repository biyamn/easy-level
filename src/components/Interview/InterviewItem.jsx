import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./InterviewItem.module.css";

const InterviewItem = ({
  interview,
  onInterviewDelete,
  onInterviewEdit,
  onSelectInterview,
  backgroundColor,
  questions,
}) => {
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
    onInterviewEdit(updatedText, interview.id);
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
    onInterviewDelete(id);
  };

  const interviewItemClicked = (id) => {
    onSelectInterview(id);
  };

  const isChecked = interview.isFinished;

  // 서버에서 가져온 questions 목록에서 현재 interview에 해당하는 question만 가져옴
  const filteredQuestions = questions.filter(
    (question) => question.interviewId === interview.id
  );

  const completedQuestionsLength = filteredQuestions.filter(
    (question) => question.isFinished === true
  ).length;

  const status = `${completedQuestionsLength} / ${filteredQuestions.length} `;

  return (
    <Container
      onClick={() => interviewItemClicked(interview.id)}
      $backgroundColor={backgroundColor}
    >
      {interview.isCompleted ? (
        <span>
          <b>🥳완료!!👏</b>
        </span>
      ) : (
        <span>
          <b>미완료</b>
        </span>
      )}
      {isEditClicked ? (
        <input
          className={
            isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
          }
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          ref={editedText}
          placeholder={interview.text}
        />
      ) : (
        <Text
          className={
            isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
          }
        >
          {interview.text}
        </Text>
      )}
      <div style={{ height: "30px" }}>
        <ActionButtons className="hover-visible">
          <>
            {!isEditClicked && !isDeleteClicked && (
              <>
                <button className={styles.editIcon} onClick={openEdit}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="2x"
                    color="white"
                  />
                </button>
                <button className={styles.deleteIcon} onClick={openDelete}>
                  <FontAwesomeIcon icon={faTrashCan} size="2x" color="white" />
                </button>
              </>
            )}
            {isEditClicked && !isDeleteClicked && (
              <>
                <button
                  className={styles.submitIcon}
                  onClick={submitEditedContent}
                >
                  <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
                </button>
                <button className={styles.cancelIcon} onClick={cancelEdit}>
                  <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
                </button>
              </>
            )}
            {!isEditClicked && isDeleteClicked && (
              <>
                <button
                  className={styles.submitIcon}
                  onClick={() => onDelete(interview.id)}
                >
                  <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
                </button>
                <button className={styles.cancelIcon} onClick={cancelDelete}>
                  <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
                </button>
              </>
            )}
          </>
        </ActionButtons>
        <Status className="hover-hidden">{status}</Status>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background: ${(props) => props.$backgroundColor};
  border-radius: 8px;
  width: 13rem;
  height: 9rem;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  justify-content: space-between;

  .hover-visible {
    display: none;
  }

  &:hover {
    .hover-hidden {
      display: none;
    }

    .hover-visible {
      display: flex;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 0.5rem;

    .hover-visible {
      display: flex;
    }

    .hover-hidden {
      display: none;
    }

    &:hover {
      .hover-hidden {
        display: none;
      }

      .hover-visible {
        display: flex;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;

const Status = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: #c1fffb;
  padding-right: 0.5rem;
`;

const Text = styled.div`
  font-size: 1.1rem;
  color: #1a202c;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export default InterviewItem;
