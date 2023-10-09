import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import Modal from "../Modal/Modal";

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
  goals,
  setTodos,
  syncTodoItemWithFirestore,
  syncGoalItemWithFirestore,
  selectedGoal,
  currentUser,
}) => {
  const [isAllFinished, setIsAllFinished] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangeBlocked, setIsChangeBlocked] = useState(false);
  const [isSelectedGoalCompleted, setIsSelectedGoalCompleted] = useState(false);
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSubmitCompletion = () => {
    const goalItemRef = doc(db, "goalItem", selectedGoal);
    updateDoc(goalItemRef, {
      isCompleted: isAllFinished,
    });

    syncGoalItemWithFirestore();
    setIsSelectedGoalCompleted(true);
    setIsModalVisible(false);
  };

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
    await updateDoc(todoItemRef, {
      isFinished: !todos.find((todo) => todo.id === id).isFinished,
    });
    syncTodoItemWithFirestore();
  };

  useEffect(() => {
    const newIsAllFinished = todos
      .filter((todo) => todo.goalId === selectedGoal)
      .every((item) => item.isFinished === true);
    setIsAllFinished(newIsAllFinished);
  }, [todos]);

  useEffect(() => {
    const selectedGoalItem = goals.find((goal) => goal.id === selectedGoal);
    if (selectedGoalItem?.isCompleted === true) {
      console.log("isCompleted true라고했음방금");
      setIsChangeBlocked(true);
    } else {
      setIsChangeBlocked(false);
    }
  }, [goals, selectedGoal]);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>투두리스트</h1>
        </div>
        <TodoInput
          onTodoSubmit={handleTodoSubmit}
          isChangeBlocked={isChangeBlocked}
        />
      </div>
      <Completion>
        {!isSelectedGoalCompleted ? (
          <Input
            type="button"
            onClick={handleModalOpen}
            disabled={!isAllFinished}
            value="목표 달성"
          />
        ) : (
          <span style={{ color: "white" }}>목표를 달성하셨어요!</span>
        )}
        <Input
          type="button"
          onClick={handleModalOpen}
          disabled={!isSelectedGoalCompleted}
          value="달성 해제"
        />
      </Completion>
      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          handleModalClose={handleModalClose}
          handleSubmitCompletion={handleSubmitCompletion}
        >
          목표 달성을 체크하시겠습니까?
        </Modal>
      )}
      <TodoItems
        todos={todos}
        onTodoCheck={handleTodoCheck}
        onTodoEdit={handleTodoEdit}
        onTodoDelete={handleTodoDelete}
        db={db}
        syncTodoItemWithFirestore={syncTodoItemWithFirestore}
        selectedGoal={selectedGoal}
        isChangeBlocked={isChangeBlocked}
      />
    </div>
  );
};

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

export default Todo;
