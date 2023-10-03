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

  // 오류 발생
  // 무한루프가 걸리는 오류
  //  onAuthStateChanged: Firebase Authentication 상태가 변경될 때 호출되는 이벤트 핸들러
  // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged
  // 이벤트 핸들러 내에서 setCurrentUser 함수를 호출하면 상태가 변경될 때마다 컴포넌트가 다시 렌더링됨 -> 무한루프
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setCurrentUser(user.uid);
  //   } else {
  //     setCurrentUser(null);
  //   }
  // });

  // 오류 해결1
  // 이렇게 해도 되긴 함
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user.uid);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   });
  // }, []);

  // 오류 해결2
  // useEffect(() => {return() => function cleanup(){}})
  // useEffect 훅을 사용하여 onAuthStateChanged 이벤트 핸들러를 한 번만 등록하고
  // 컴포넌트가 언마운트될 때 해당 이벤트 핸들러를 해제
  useEffect(() => {
    // onAuthStateChanged 이벤트 핸들러 등록
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    // https://react.dev/learn/lifecycle-of-reactive-effects
    // 컴포넌트가 언마운트될 때 이벤트 핸들러를 해제
    return () => unsubscribe();
  }, []); // 빈 배열을 전달하여 처음 한 번만 실행되도록 함

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
          isFinished: doc.data().isFinished,
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
        />
        {selectedGoal ? (
          <Todo
            db={db}
            todos={todos}
            setTodos={setTodos}
            syncTodoItemWithFirestore={syncTodoItemWithFirestore}
            selectedGoal={selectedGoal}
            currentUser={currentUser}
          />
        ) : (
          <Main />
        )}
      </div>
    </div>
  );
};

export default App;
