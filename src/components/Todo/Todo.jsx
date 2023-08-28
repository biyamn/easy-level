import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Todo = ({ db, displayInputs, syncTodoItemWithFirestore }) => {
  const submitEditedContent = async (updatedText, id) => {
    const todoItemRef = doc(db, "todoItem", id);
    await updateDoc(todoItemRef, {
      text: updatedText,
    });
    syncTodoItemWithFirestore();
  };

  const onSaveTodo = async (enteredTodo) => {
    await addDoc(collection(db, "todoItem"), {
      text: enteredTodo,
      isFinished: false,
    });

    syncTodoItemWithFirestore();
  };

  const onDelete = async (id) => {
    const todoItemRef = doc(db, "todoItem", id);
    await deleteDoc(todoItemRef);
    syncTodoItemWithFirestore();
  };

  const onCheck = async (id) => {
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
        <TodoInput onSaveTodo={onSaveTodo} />
      </div>
      <TodoList
        item={displayInputs}
        onDelete={onDelete}
        submitEditedContent={submitEditedContent}
        db={db}
        syncTodoItemWithFirestore={syncTodoItemWithFirestore}
        onCheck={onCheck}
        displayInputs={displayInputs}
      />
    </div>
  );
};

export default Todo;
