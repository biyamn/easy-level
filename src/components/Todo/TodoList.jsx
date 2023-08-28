import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const TodoList = (props) => {
  const onDelete = (id) => props.onDelete(id);

  const submitEditedContent = (updatedText, id) =>
    props.submitEditedContent(updatedText, id);

  return (
    <div className={styles.container}>
      {props.item.map((todo) => (
        <TodoItem
          todo={todo}
          onDelete={onDelete}
          key={todo.id}
          submitEditedContent={submitEditedContent}
          db={props.db}
          syncTodoItemWithFirestore={props.syncTodoItemWithFirestore}
          onCheck={props.onCheck}
          displayInputs={props.displayInputs}
        />
      ))}
    </div>
  );
};

export default TodoList;
