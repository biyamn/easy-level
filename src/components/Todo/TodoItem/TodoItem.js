// import React from 'react'
import styles from './TodoItem.module.css'

const TodoItem = (props) => {
  const onDelete = (id) => props.onDelete(id);

  return (
    <div className={styles.items}>
      {props.item.map((todo) => (
        <div 
          className={styles.item} 
          key={todo.id} 
          onClick={() => onDelete(todo.id)}>{todo.text}
        </div>
      ))}
    </div>
  );
};

export default TodoItem;