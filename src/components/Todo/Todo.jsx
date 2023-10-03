import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import styles from "./Todo.module.css";
import styled from "styled-components";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Todo = ({
  db,
  todos,
  setTodos,
  syncTodoItemWithFirestore,
  selectedGoal,
  currentUser,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

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
      goalId: selectedGoal,
      userId: currentUser,
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
    console.log("todoItemRef", todoItemRef);
    await updateDoc(todoItemRef, {
      isFinished: !todos.find((todo) => todo.id === id).isFinished,
    });
    syncTodoItemWithFirestore();
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>투두리스트</h1>
        </div>
        <TodoInput onTodoSubmit={handleTodoSubmit} />
      </div>
      <Completion>
        <Button disabled={isCompleted} onClick={() => console.log("clicked")}>
          완료
        </Button>
      </Completion>
      <TodoItems
        todos={todos}
        onTodoCheck={handleTodoCheck}
        onTodoEdit={handleTodoEdit}
        onTodoDelete={handleTodoDelete}
        db={db}
        syncTodoItemWithFirestore={syncTodoItemWithFirestore}
        selectedGoal={selectedGoal}
      />
    </div>
  );
};

export default Todo;

const Completion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  height: 30px;
  margin-left: 10px;
  border: 1px solid transparent;
  color: black;
  background: #cccccc;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1rem;
`;
