import React from 'react';
import styles from './QuestionItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import {
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

const QuestionItem = ({
  question,
  onQuestionDelete,
  onQuestionEdit,
  onQuestionCheck,
}) => {
  const editedText = useRef(null);
  const [value, setValue] = useState('');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  // firestore에서 questionItem의 answer를 가져옴
  const answer = question.answer;

  const submitEditedContent = () => {
    if (value === '') {
      setIsEditClicked(false);
      return;
    }

    setIsEditClicked(false);
    onQuestionEdit(value, question.id);

    setValue(value);
  };

  const openEdit = () => {
    setIsEditClicked(true);
    editedText.current?.focus();
  };

  const openDelete = () => {
    setIsDeleteClicked(true);
  };

  const cancelEdit = () => {
    setIsEditClicked(false);
  };

  const cancelDelete = () => {
    setIsDeleteClicked(false);
  };

  const onDelete = (id) => {
    onQuestionDelete(id);
  };

  const onCheck = (id) => {
    onQuestionCheck(id);
  };

  const isChecked = question.isFinished;

  return (
    <Accordion
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isChecked ? '#fdffd0' : '#ffffff',
        width: '100%',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={() => onCheck(question.id)}
            checked={question.isFinished}
          />
          <div>
            <FontAwesomeIcon
              icon={faCheck}
              color="#000000"
              className={styles.checkIcon}
            />
          </div>
        </label>
        <div
          className={
            isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
          }
        >
          {question.text}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {isEditClicked ? (
          <input
            className={
              isChecked ? `${styles.text} ${styles.checked}` : `${styles.text}`
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="이곳에 답변을 작성해 주세요."
          />
        ) : (
          <div>{answer}</div>
        )}
      </AccordionDetails>
      <AccordionActions>
        {isEditClicked && !isDeleteClicked ? (
          <>
            <Button onClick={submitEditedContent}>
              <FontAwesomeIcon icon={faCheck} size="2x" color="#000000" />
            </Button>
            <Button onClick={cancelEdit}>
              <FontAwesomeIcon icon={faXmark} size="2x" color="#000000" />
            </Button>
          </>
        ) : !isEditClicked && isDeleteClicked ? (
          <>
            <Button onClick={() => onDelete(question.id)}>
              <FontAwesomeIcon icon={faCheck} size="2x" color="#000000" />
            </Button>
            <Button onClick={cancelDelete}>
              <FontAwesomeIcon icon={faXmark} size="2x" color="#000000" />
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ border: 'none', background: 'none' }}
              onClick={openEdit}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="2x" color="#000000" />
            </Button>
            <Button onClick={openDelete}>
              <FontAwesomeIcon icon={faTrashCan} size="2x" color="#000000" />
            </Button>
          </>
        )}
      </AccordionActions>
    </Accordion>
  );
};

const Button = styled.button`
  background-color: transparent;
  color: #000000;
  border: none;
  cursor: pointer;
`;

export default QuestionItem;
