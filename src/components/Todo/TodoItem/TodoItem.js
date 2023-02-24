import styles from "./TodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const TodoItem = (props) => {
  const editedText = useRef(null);

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [updatedText, setUpdatedText] = useState('');

  const submitEditedContent = () => {
    if (updatedText === '') {
      setIsEditClicked(false);
      return;
    }
    props.submitEditedContent(updatedText, props.todo.id);
    setUpdatedText('');
    setIsEditClicked(false);
  }

  const openEdit = () => {
    setIsEditClicked(true);
    editedText.current.focus();
  }

  const openDelete = () => {
    setIsDeleteClicked(true);
  };

  const cancelEdit = () => {
    setUpdatedText('');
    setIsEditClicked(false);
  }

  const cancelDelete = () => {
    setIsDeleteClicked(false);
  };


  const onDelete = (id) => {
    props.onDelete(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkboxAndText}>
        <label>
          <input type="checkbox" onClick={() => setIsChecked(!isChecked)} />
          <div>
            <FontAwesomeIcon icon={faCheck} color="#1a202c" className={styles.checkIcon} />
          </div>
        </label>
        {isEditClicked
          ? (
            <div className={isChecked? `${styles.text} ${styles.checked}` : `${styles.text}`}>
              <input
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                ref={editedText}
                placeholder='Edit Todo'
              />
            </div>
          ) : (
          <div className={isChecked? `${styles.text} ${styles.checked}` : `${styles.text}`}>
            {props.todo.text}
          </div>)
        }
        
      </div>
      <div>
      {(isEditClicked && !isDeleteClicked) ? (
        <div>
          <button className={styles.submitIcon} onClick={submitEditedContent}>
            <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
          </button>
          <button className={styles.cancelIcon} onClick={cancelEdit}>
            <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
          </button>
        </div>
        ) : ((!isEditClicked && isDeleteClicked) ? (
        <div className={styles.submitBtnAndCancelBtn}>
          <button
            className={styles.submitIcon}
            onClick={() => onDelete(props.todo.id)}
          >
            <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
          </button>
          <button className={styles.cancelIcon} onClick={cancelDelete}>
            <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
          </button>
        </div>
        ) : (
        <div className={styles.editBtnAndDeleteBtn}>
          <button className={styles.editIcon} onClick={openEdit}>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" color="white" />
          </button>
          <button className={styles.deleteIcon} onClick={openDelete}>
            <FontAwesomeIcon icon={faTrashCan} size="2x" color="white" />
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TodoItem;
