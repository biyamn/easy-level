// import React from 'react'
import styles from './TodoItem.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const TodoItem = (props) => {
  const onDelete = (id) => props.onDelete(id);

  return (
    <div>
      {props.item.map((todo) => (
        <div className={styles.textAndDeteteBtn} key={todo.id}>
          <div 
            className={styles.text} 
            onClick={() => onDelete(todo.id)}>{todo.text}
          </div>
          <button><FontAwesomeIcon icon={faTrashCan} size="2x"color="white"/></button>
        </div>
      ))}
    </div>
  );
};

export default TodoItem;