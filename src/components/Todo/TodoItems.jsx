import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const TodoItems = ({
  displayInputs,
  onCheckTodo,
  onDeleteTodo,
  onEditTodo,
}) => {
  const handleTodoDelete = (id) => onDeleteTodo(id);

  const handleTodoEdit = (updatedText, id) => onEditTodo(updatedText, id);

  const handleTodoCheck = (id) => onCheckTodo(id);
  return (
    <div className={styles.container}>
      {displayInputs.map((todo) => (
        <TodoItem
          todo={todo}
          onDeleteTodo={handleTodoDelete}
          key={todo.id}
          onEditTodo={handleTodoEdit}
          onCheckTodo={handleTodoCheck}
        />
      ))}
    </div>
  );
};

export default TodoItems;
