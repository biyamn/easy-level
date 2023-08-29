import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const TodoItems = ({ todos, onTodoCheck, onTodoDelete, onTodoEdit }) => {
  const handleTodoDelete = (id) => onTodoDelete(id);

  const handleTodoEdit = (updatedText, id) => onTodoEdit(updatedText, id);

  const handleTodoCheck = (id) => onTodoCheck(id);
  return (
    <div className={styles.container}>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          onTodoDelete={handleTodoDelete}
          key={todo.id}
          onTodoEdit={handleTodoEdit}
          onTodoCheck={handleTodoCheck}
        />
      ))}
    </div>
  );
};

export default TodoItems;
