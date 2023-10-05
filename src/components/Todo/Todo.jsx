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
  // console.log("todos", todos);
  const [buttonDisabled, setButtonDisabled] = useState(false);
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

    setIsCompleted([
      ...isCompleted,
      {
        id: selectedGoal,
        isCompleted: false,
      },
    ]);
    // console.log("submit isCompleted: ", isCompleted);
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
    // TODO: 버튼 활성화, 비활성화
    // todoItem에서 userId, goalId가 같은 todo를 찾아서
    // 그 todo의 isFinished가 모두 true이면 goalItem의 isCompleted를 true로 변경
    // db에서 todoItem을 찾아서 모든 todoitem을 보여준다

    // syncGoalItemWithFirestore();

    // console.log("todos: ", todos);
    todos.map((todo) => {
      if (todo.isFinished === true) {
        setIsCompleted([
          ...isCompleted,
          {
            id: selectedGoal,
            isCompleted: true,
          },
        ]);
      }
    });
    // console.log("edit isCompleted: ", isCompleted);

    console.log("isCompleted: ", isCompleted);
    setButtonDisabled(
      isCompleted.find((goal) => goal.id === selectedGoal).isCompleted
    );

    console.log("buttonDisabled: ", buttonDisabled);

    // selectedGoal의 isCompleted가 true인지 false인지를 isGoalCompleted에 저장
    console.log("goals: ", goals);
    console.log(
      "find: ",
      goals.find((goal) => goal.id === selectedGoal)
    );
    const goalItemRef = doc(db, "goalItem", id);
    await updateDoc(goalItemRef, {
      isCompleted: buttonDisabled,
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
        <Input
          type="button"
          disabled={buttonDisabled}
          onClick={() => console.log(buttonDisabled)}
          value="목표 달성"
        />
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
  background: #cccccc;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1rem;
`;
