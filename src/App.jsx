import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo";
import Goal from "./components/Goal/Goal";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { key } from "../key";

const App = () => {
  const [todos, setTodos] = useState([]);

  const firebaseConfig = key;
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
        });
      });
      setTodos(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncTodoItemWithFirestore();
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <Goal />
        <Todo
          db={db}
          todos={todos}
          setTodos={setTodos}
          syncTodoItemWithFirestore={syncTodoItemWithFirestore}
        />
      </div>
    </div>
  );
};

export default App;
