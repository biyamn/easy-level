import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo";
import Goal from "./components/Goal/Goal";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";

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

// Initialize Firebase
const firebaseConfig = config;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 이부분에 문제가 있었음
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const today = new Date();
const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const day = WEEKDAY[today.getDay()];
const todayString = `${month}월 ${date}일 ${day}요일`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCompleted, setIsCompleted] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSelectedGoal = (id) => {
    if (id === selectedGoal) {
      setSelectedGoal(null);
    } else {
      setSelectedGoal(id);
    }
  };

  const syncTodoItemWithFirestore = () => {
    const q = query(
      collection(db, "todoItem"),
      where("userId", "==", currentUser),
      orderBy("createdTime", "desc")
    );
    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          text: doc.data().text,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime,
          goalId: doc.data().goalId,
          userId: doc.data().userId,
        });
      });
      // todos를 firestore에서 가져온 firestoreTodoItemList로 업데이트
      // 따라서 syncTodoItemWithFirestore를 하고 바로 todos를 사용하면 안됨
      // 왜냐면 firestoreTodoItemList가 아니라 기존의 todos를 사용할 것이기 때문
      setTodos(firestoreTodoItemList);
    });
  };

  const syncGoalItemWithFirestore = () => {
    const q = query(
      collection(db, "goalItem"),
      where("userId", "==", currentUser),
      orderBy("createdTime", "desc")
    );
    getDocs(q).then((querySnapshot) => {
      const firestoreGoalItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreGoalItemList.push({
          id: doc.id,
          text: doc.data().text,
          createdTime: doc.data().createdTime,
          isCompleted: doc.data().isCompleted,
          userId: doc.data().userId,
        });
      });
      setGoals(firestoreGoalItemList);
    });
  };

  useEffect(() => {
    syncTodoItemWithFirestore();
  }, [currentUser]);

  useEffect(() => {
    syncGoalItemWithFirestore();
  }, [currentUser]);

  return (
    <div className={styles.App}>
      <Navbar
        provider={provider}
        auth={auth}
        currentUser={currentUser}
        todayString={todayString}
      />
      <div className={styles.box}>
        <Goal
          db={db}
          goals={goals}
          setGoals={setGoals}
          syncGoalItemWithFirestore={syncGoalItemWithFirestore}
          syncTodoItemWithFirestore={syncTodoItemWithFirestore}
          onSelectGoal={handleSelectedGoal}
          selectedGoal={selectedGoal}
          currentUser={currentUser}
          year={year}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
        {selectedGoal ? (
          <Todo
            db={db}
            todos={todos}
            goals={goals}
            setTodos={setTodos}
            syncTodoItemWithFirestore={syncTodoItemWithFirestore}
            syncGoalItemWithFirestore={syncGoalItemWithFirestore}
            selectedGoal={selectedGoal}
            currentUser={currentUser}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />
        ) : (
          <Main />
        )}
      </div>
    </div>
  );
};

export default App;
