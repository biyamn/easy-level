import styles from "./TodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const TodoItem = (props) => {
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedText, setUpdatedText] = useState('');

  const openEdit = () => {
    setIsEditClicked(true);
  }

  const openDelete = () => {
    setIsDeleteClicked(true);
  };

  const cancelEdit = () => {
    setIsEditClicked(false);
  }

  const cancelDelete = () => {
    setIsDeleteClicked(false);
  };


  const onDelete = (id) => {
    props.onDelete(id);
  };

  return (
    <div className={styles.textAndDeteteBtn}>
      <div className={styles.checkboxAndText}>
        <label>
          <input type="checkbox" onClick={() => setIsChecked(!isChecked)} />
          <div>
            <FontAwesomeIcon icon={faCheck} color="#1a202c" className={styles.checkIcon} />
          </div>
        </label>
        <div className={isChecked? `${styles.text} ${styles.checked}` : `${styles.text}`}>{props.todo.text}</div>
      </div>
      <div>
      <div className={styles.editBtnAndDeleteBtn}>
        {isEditClicked ? (
          <div>
            <button className={styles.submitIcon}
            >
            <FontAwesomeIcon icon={faCheck} size="2x" color="white" />
            </button>
            <button className={styles.cancelIcon} onClick={cancelEdit}>
              <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
            </button>
          </div>
        ) : (
          <div>
            <button className={styles.editIcon} onClick={openEdit}>
            <FontAwesomeIcon icon={faPenToSquare} size="2x" color="white" />
            </button>
            
          </div>
        )}
        {isDeleteClicked ? (
          <div>
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
          <div>
            
            <button className={styles.delteIcon} onClick={openDelete}>
              <FontAwesomeIcon icon={faTrashCan} size="2x" color="white" />
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
