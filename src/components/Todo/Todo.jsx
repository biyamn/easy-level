import React, { useState, useEffect } from "react";
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
  getDocs,
} from "firebase/firestore";

const Todo = ({
  db,
  todos,
  goals,
  setTodos,
  syncTodoItemWithFirestore,
  syncGoalItemWithFirestore,
  selectedGoal,
  currentUser,
  isCompleted,
  setIsCompleted,
}) => {
  const [isAllFinished, setIsAllFinished] = useState(false);
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

    // console.log("submit isCompleted: ", isCompleted);
    syncTodoItemWithFirestore();
  };

  const handleTodoDelete = async (id) => {
    const todoItemRef = doc(db, "todoItem", id);
    await deleteDoc(todoItemRef);
    syncTodoItemWithFirestore();
  };

  const handleTodoCheck = async (id) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isFinished: !todo.isFinished,
        };
      }
      return todo;
    });

    const todoItemRef = doc(db, "todoItem", id);
    await updateDoc(todoItemRef, {
      isFinished: !todos.find((todo) => todo.id === id).isFinished,
    });
    syncTodoItemWithFirestore();

    const newIsAllFinished = newTodo.every((item) => item.isFinished === true);
    console.log("newIsAllFinished: ", newIsAllFinished);
    if (newIsAllFinished) {
      console.log("모두 true");
      setIsCompleted(
        isCompleted.map((goal) => {
          if (goal.id === selectedGoal) {
            return {
              ...goal,
              isCompleted: true,
            };
          }
          return goal;
        })
      );
    } else {
      setIsCompleted(
        isCompleted.map((goal) => {
          if (goal.id === selectedGoal) {
            return {
              ...goal,
              isCompleted: false,
            };
          }
          return goal;
        })
      );
    }

    setIsAllFinished(newIsAllFinished);

    const goalItemRef = doc(db, "goalItem", selectedGoal);
    await updateDoc(goalItemRef, {
      isCompleted: newIsAllFinished,
    });

    syncGoalItemWithFirestore();
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
        <Input type="button" disabled={!isAllFinished} value="목표 달성" />
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

const Input = styled.input`
  height: 30px;
  margin-left: 10px;
  border: 1px solid transparent;
  color: black;
  background: yellow;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1rem;

  &:disabled {
    color: white;
    cursor: not-allowed;
    background: #ccc;
  }
`;
