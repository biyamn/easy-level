import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';

import styles from './Todo.module.css';
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const Todo = ({
  db,
  todos,
  goals,
  setTodos,
  syncTodoItemWithFirestore,
  selectedGoal,
  currentUser,
}) => {
  const [isAllFinished, setIsAllFinished] = useState(false);
  const [isChangeBlocked, setIsChangeBlocked] = useState(false);

  const handleTodoEdit = async (updatedText, id) => {
    console.log('updatedText: ', updatedText);
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            answer: updatedText,
          };
        }
        return todo;
      }),
    );
    handleEditSync(updatedText, id);
  };

  const handleEditSync = async (updatedText, id) => {
    console.log('todos: ', todos);
    const todoItemRef = doc(db, 'todoItem', id);
    await updateDoc(todoItemRef, {
      answer: updatedText,
    });
    syncTodoItemWithFirestore();
  };

  const handleTodoSubmit = async (enteredTodo) => {
    await addDoc(collection(db, 'todoItem'), {
      text: enteredTodo,
      answer: '',
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
    setIsAllFinished(newIsAllFinished);
  }, [todos]);

  useEffect(() => {
    const selectedGoalItem = goals.find((goal) => goal.id === selectedGoal);
    if (selectedGoalItem?.isCompleted === true) {
      setIsChangeBlocked(true);
    } else {
      setIsChangeBlocked(false);
    }
  }, [goals, selectedGoal]);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>예상 질문</h1>
        </div>
        <TodoInput
          onTodoSubmit={handleTodoSubmit}
          isChangeBlocked={isChangeBlocked}
        />
      </div>
      <TodoItems
        todos={todos}
        onTodoCheck={handleTodoCheck}
        onTodoEdit={handleTodoEdit}
        onTodoDelete={handleTodoDelete}
        selectedGoal={selectedGoal}
      />
    </div>
  );
};

export default Todo;
