import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo";
import Goal from "./components/Goal/Goal";
import TodoListAppBar from "./components/AppBar/TodoListAppBar";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { key } from "../key";
const App = () => {
  const {
    VITE_API_KEY,
    VITE_AUTH_DOMAIN,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET,
    VITE_MESSAGING_SENDERID,
    VITE_APP_ID,
    VITE_MEASUREMENT_ID,
  } = import.meta.env;

  const config = {
    apiKey: VITE_API_KEY,
    authDomain: VITE_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDERID,
    appId: VITE_APP_ID,
    measurementId: VITE_MEASUREMENT_ID,
  };

  console.log("config: ", config);
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleSelectedGoal = (id) => {
    setSelectedGoal(id);
  };

  const firebaseConfig = config;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const syncTodoItemWithFirestore = () => {
    const q = query(collection(db, "todoItem"), orderBy("createdTime", "asc"));

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          text: doc.data().text,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime,
          goalId: doc.data().goalId,
        });
      });
      setTodos(firestoreTodoItemList);
    });
  };

  const syncGoalItemWithFirestore = () => {
    const q = query(collection(db, "goalItem"), orderBy("createdTime", "asc"));

    getDocs(q).then((querySnapshot) => {
      const firestoreGoalItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreGoalItemList.push({
          id: doc.id,
          text: doc.data().text,
          createdTime: doc.data().createdTime,
          isFinished: doc.data().isFinished,
        });
      });
      setGoals(firestoreGoalItemList);
    });
  };

  useEffect(() => {
    syncTodoItemWithFirestore();
  }, []);

  useEffect(() => {
    syncGoalItemWithFirestore();
  }, []);

  return (
    <div className={styles.App}>
      <TodoListAppBar />
      <div className={styles.box}>
        <Goal
          db={db}
          goals={goals}
          setGoals={setGoals}
          syncGoalItemWithFirestore={syncGoalItemWithFirestore}
          onSelectGoal={handleSelectedGoal}
          selectedGoal={selectedGoal}
        />
        <Todo
          db={db}
          todos={todos}
          setTodos={setTodos}
          syncTodoItemWithFirestore={syncTodoItemWithFirestore}
          selectedGoal={selectedGoal}
        />
      </div>
    </div>
  );
};

export default App;
