import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({
  todos,
  onTodoCheck,
  onTodoDelete,
  onTodoEdit,
  selectedGoal,
}) => {
  const handleTodoDelete = (id) => onTodoDelete(id);

  const handleTodoEdit = (updatedText, id) => onTodoEdit(updatedText, id);

  const handleTodoCheck = (id) => onTodoCheck(id);

  const selectedTodos = todos.filter((todo) => todo.goalId === selectedGoal);

  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {selectedTodos.map((todo) => (
          <TodoItem
            todo={todo}
            onTodoDelete={handleTodoDelete}
            key={todo.id}
            onTodoEdit={handleTodoEdit}
            onTodoCheck={handleTodoCheck}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoItems;
