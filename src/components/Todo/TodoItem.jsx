import React from "react";
import styles from "./TodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import {
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TodoItem = ({
  todo,
  onTodoDelete,
  onTodoEdit,
  onTodoCheck,
  isChangeBlocked,
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
    <Accordion style={{ display: "flex", flexDirection: "column" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={() => onCheck(todo.id)}
            checked={todo.isFinished}
            disabled={isChangeBlocked}
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
          <Typography>
            <input
              className={
                isChecked
                  ? `${styles.text} ${styles.checked}`
                  : `${styles.text}`
              }
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              ref={editedText}
              placeholder={todo.text}
            />
          </Typography>
        ) : (
          <Typography>
            <div
              className={
                isChecked
                  ? `${styles.text} ${styles.checked}`
                  : `${styles.text}`
              }
            >
              {todo.text}
            </div>
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        {!isChangeBlocked && (
          <>
            {isEditClicked && !isDeleteClicked ? (
              <>
                <button onClick={submitEditedContent}>
                  <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
                </button>
                <button onClick={cancelEdit}>
                  <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
                </button>
              </>
            ) : !isEditClicked && isDeleteClicked ? (
              <>
                <button onClick={() => onDelete(todo.id)}>
                  <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
                </button>
                <button onClick={cancelDelete}>
                  <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
                </button>
              </>
            ) : (
              <>
                <button onClick={openEdit}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="2x"
                    color="white"
                  />
                </button>
                <button onClick={openDelete}>
                  <FontAwesomeIcon icon={faTrashCan} size="2x" color="white" />
                </button>
              </>
            )}
          </>
        )}
      </AccordionActions>
    </Accordion>
  );
};

export default TodoItem;
