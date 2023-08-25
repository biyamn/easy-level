import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo/Todo";
import Goal from "./components/Goal/Goal/Goal";
import { key } from "../key";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = key;
console.log("firebaseConfig", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const App = () => {
  const [displayInputs, setDisplayInputs] = useState([]);
  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <Goal />
        <Todo
          db={db}
          displayInputs={displayInputs}
          setDisplayInputs={setDisplayInputs}
        />
      </div>
    </div>
  );
};

export default App;
