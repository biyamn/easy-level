import React from "react";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import styles from "./Todo.module.css";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Todo = ({ db, todos, setTodos, syncTodoItemWithFirestore }) => {
  const handleTodoEdit = async (updatedText, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: updatedText,
          };
        }
        return todo;
      })
    );
    handleEditSync(updatedText, id);
  };

  const handleEditSync = async (updatedText, id) => {
    const todoItemRef = doc(db, "todoItem", id);
    await updateDoc(todoItemRef, {
      text: updatedText,
    });
    syncTodoItemWithFirestore();
  };

  const handleTodoSubmit = async (enteredTodo) => {
    await addDoc(collection(db, "todoItem"), {
      text: enteredTodo,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
    });

    syncTodoItemWithFirestore();
  };

  const handleTodoDelete = async (id) => {
    const todoItemRef = doc(db, "todoItem", id);
    await deleteDoc(todoItemRef);
    syncTodoItemWithFirestore();
  };

  const handleTodoCheck = async (id) => {
    const todoItemRef = doc(db, "todoItem", id);

    await updateDoc(todoItemRef, {
      isFinished: !todos.find((todo) => todo.id === id).isFinished,
    });
    syncTodoItemWithFirestore();
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Todo list</h1>
        </div>
        <TodoInput onTodoSubmit={handleTodoSubmit} />
      </div>
      <TodoItems
        todos={todos}
        onTodoCheck={handleTodoCheck}
        onTodoEdit={handleTodoEdit}
        onTodoDelete={handleTodoDelete}
        db={db}
        syncTodoItemWithFirestore={syncTodoItemWithFirestore}
      />
    </div>
  );
};

export default Todo;