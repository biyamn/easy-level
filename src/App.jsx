// zod nicemodal react hook form

import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Todo from './components/Todo/Todo';
import Goal from './components/Goal/Goal';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { initializeApp } from 'firebase/app';
import getInitialValue from './utils/getInitialValue';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const today = new Date();
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const day = WEEKDAY[today.getDay()];
const todayString = `${year}년 ${month}월 ${date}일 (${day})`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCompleted, setIsCompleted] = useState([]);

  const handleSelectedGoal = (id) => {
    if (id === selectedGoal) {
      setSelectedGoal(null);
    } else {
      setSelectedGoal(id);
    }
  };

  // 초기값 설정
  // 아예 속성에 todos를 넣어버린다(firestore에는 없음)
  // 여기 todos에는 goalId가 없음
  // goal, todo에 id도 모두 없음(firestore가 만들어 줄 거임)

  // syncGoalItemWithFirestore, syncTodoItemWithFirestore: firestore에서 데이터를 가져와서 state에 저장
  // firebase에 데이터를 보내는 함수 아님. 가져와서 state에 저장하는 함수임
  // 그래서 여기서 바꿀 건 없음
  const syncGoalItemWithFirestore = () => {
    const q = query(
      collection(db, 'goalItem'),
      where('userId', '==', currentUser),
      orderBy('createdTime', 'desc')
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

  const syncTodoItemWithFirestore = () => {
    const q = query(
      collection(db, 'todoItem'),
      where('userId', '==', currentUser),
      orderBy('createdTime', 'desc')
    );
    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          text: doc.data().text,
          answer: doc.data().answer,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime,
          goalId: doc.data().goalId,
          userId: doc.data().userId,
        });
      });
      setTodos(firestoreTodoItemList);
    });
  };

  // 여기를 추가했다
  useEffect(() => {
    // 맨 처음에 firebase에서 'goalItem' 데이터를 가져오는 쿼리를 작성함

    const initialValue = getInitialValue(currentUser);
    const q = query(
      collection(db, 'goalItem'),
      where('userId', '==', currentUser),
      orderBy('createdTime', 'desc')
    );
    // 쿼리로 데이터를 가져옴(getDocs)
    getDocs(q).then((querySnapshot) => {
      // 가져온 goalItem이 없을 때. 즉 계정이 처음 만들어졌을 때
      if (querySnapshot.size === 0) {
        // 구조분해할당으로 initialValue에서 todos와 ...goal을 나눠서 가져옴(goal은 꼭 goal이 아니어도 됨. 그냥 나머지라는 뜻임)
        initialValue.forEach(async ({ todos, ...goal }) => {
          // goal을 추가하는 부분. 추가로 끝나는 . 게아니라 goalResponse라는 변수에 저장한다.
          const goalResponse = await addDoc(collection(db, 'goalItem'), goal);
          // todo를 추가하는 부분. todos에서 id를 받아 todo의 goalId로 등록하여 firestore에 저장한다.
          todos.forEach(async (todo) => {
            await addDoc(collection(db, 'todoItem'), {
              ...todo,
              goalId: goalResponse.id,
            });
          });
        });
      }
    });
  }, [currentUser]);

  useEffect(() => {
    syncTodoItemWithFirestore();
  }, [currentUser]);

  useEffect(() => {
    syncGoalItemWithFirestore();
  }, [currentUser]);

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
          todos={todos}
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
