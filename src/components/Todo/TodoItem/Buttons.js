import styles from './Buttons.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Buttons = (props) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const openDelete = () => {
    setIsDeleteClicked(true)
  }
  
  const cancelDelete = () => {
    setIsDeleteClicked(false)
  }

  const onDelete = (id) => props.onDelete(id);
  return (
    <div>
      {isDeleteClicked ? 
        <div>
          <button className={styles.delteOkIcon} onClick={() => onDelete(props.todo.id)}><FontAwesomeIcon icon={faCheck} size="2x" color="white"/></button>
          <button className={styles.delteNoIcon} onClick={cancelDelete}><FontAwesomeIcon icon={faXmark} size="2x" color="white"/></button>
        </div> :
        <button className={styles.delteIcon} onClick={openDelete}><FontAwesomeIcon icon={faTrashCan} size="2x" color="white"/></button> 
      }
    </div>
  );
};

export default Buttons;