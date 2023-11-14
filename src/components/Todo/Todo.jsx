import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';

import styles from './Todo.module.css';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const Todo = ({
  db,
  todos,
  goals,
  setTodos,
  syncTodoItemWithFirestore,
  syncGoalItemWithFirestore,
  selectedGoal,
  currentUser,
  answers,
}) => {
  const handleTodoEdit = async (updatedText, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            answer: updatedText,
          };
        }
        return todo;
      })
    );
    handleEditSync(updatedText, id);
  };

  const handleEditSync = async (updatedText, id) => {
    const todoItemRef = doc(db, 'todoItem', id);
    await updateDoc(todoItemRef, {
      answer: updatedText,
    });
    syncTodoItemWithFirestore();
  };

  const handleTodoSubmit = async (enteredTodo) => {
    await addDoc(collection(db, 'todoItem'), {
      text: enteredTodo,
      answer: '이곳에 답변을 작성해 주세요.',
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      goalId: selectedGoal,
      userId: currentUser,
    });

    syncTodoItemWithFirestore();
  };

  const handleTodoDelete = async (id) => {
    const todoItemRef = doc(db, 'todoItem', id);
    await deleteDoc(todoItemRef);
    syncTodoItemWithFirestore();
  };

  const handleTodoCheck = async (id) => {
    const todoItemRef = doc(db, 'todoItem', id);
    await updateDoc(todoItemRef, {
      isFinished: !todos.find((todo) => todo.id === id).isFinished,
    });
    syncTodoItemWithFirestore();
  };

  useEffect(() => {
    const newIsAllFinished = todos
      .filter((todo) => todo.goalId === selectedGoal)
      .every((item) => item.isFinished === true);
    // goal의 isCompleted를 바꾸기
    const goalItemRef = doc(db, 'goalItem', selectedGoal);
    updateDoc(goalItemRef, {
      isCompleted: newIsAllFinished,
    });
    syncGoalItemWithFirestore();
  }, [todos]);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>예상 질문</h1>
        </div>
        <TodoInput onTodoSubmit={handleTodoSubmit} />
      </div>
      <TodoItems
        db={db}
        todos={todos}
        onTodoCheck={handleTodoCheck}
        onTodoEdit={handleTodoEdit}
        onTodoDelete={handleTodoDelete}
        selectedGoal={selectedGoal}
        currentUser={currentUser}
        answers={answers}
      />
    </div>
  );
};

export default Todo;
