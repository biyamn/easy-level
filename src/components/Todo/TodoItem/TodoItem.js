// import React from 'react'
import styles from './TodoItem.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const TodoItem = (props) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const onDelete = (id) => {
    props.onDelete(id);
  }
  const openDelete = () => {
    setIsDeleteClicked(true)
  }
  const cancelDelete = () => {
    setIsDeleteClicked(false)
  }

  return (
    <div>
      {props.item.map((todo) => (
        <div className={styles.textAndDeteteBtn} key={todo.id}>
          <div className={styles.text}>{todo.text}
          </div>
          {isDeleteClicked ? 
              <div>
                <button className={styles.delteOkIcon} onClick={() => onDelete(todo.id)}><FontAwesomeIcon icon={faCheck} size="2x" color="white"/></button>
                <button className={styles.delteNoIcon} onClick={cancelDelete}><FontAwesomeIcon icon={faXmark} size="2x" color="white"/></button>
              </div> :
              <button className={styles.delteIcon} onClick={openDelete}><FontAwesomeIcon icon={faTrashCan} size="2x" color="white"/></button> }
        </div>
      ))}
    </div>
  );
};

export default TodoItem;