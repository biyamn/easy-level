import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo";
import Goal from "./components/Goal/Goal";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { key } from "../key";

const App = () => {
  const firebaseConfig = key;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const syncTodoItemWithFirestore = () => {
    getDocs(collection(db, "todoItem")).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          text: doc.data().text,
          isFinished: doc.data().isFinished,
        });
      });
      setDisplayInputs(firestoreTodoItemList);
    });
  };

  const [displayInputs, setDisplayInputs] = useState([]);

  useEffect(() => {
    syncTodoItemWithFirestore();
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <Goal />
        <Todo
          db={db}
          displayInputs={displayInputs}
          setDisplayInputs={setDisplayInputs}
          syncTodoItemWithFirestore={syncTodoItemWithFirestore}
        />
      </div>
    </div>
  );
};

export default App;
