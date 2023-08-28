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

const Todo = ({ db, displayInputs, syncTodoItemWithFirestore }) => {
  const handleTodoEdit = async (updatedText, id) => {
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
      isFinished: !displayInputs.find((todo) => todo.id === id).isFinished,
    });
    syncTodoItemWithFirestore();
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Todo list</h1>
        </div>
        <TodoInput onSubmitTodo={handleTodoSubmit} />
      </div>
      <TodoItems
        displayInputs={displayInputs}
        onCheckTodo={handleTodoCheck}
        onEditTodo={handleTodoEdit}
        onDeleteTodo={handleTodoDelete}
        db={db}
        syncTodoItemWithFirestore={syncTodoItemWithFirestore}
      />
    </div>
  );
};

export default Todo;
