import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

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

  // console.log("todos: ", todos);
  const selectedTodos = todos.filter((todo) => todo.goalId === selectedGoal);

  return (
    <div className={styles.container}>
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
  );
};

export default TodoItems;
