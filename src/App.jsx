import React from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo/Todo";
import Goal from "./components/Goal/Goal/Goal";
import { key } from "../key";
import { getFirestore } from "firebase/firestore";

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
  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <Goal />
        <Todo db={db} />
      </div>
    </div>
  );
};

export default App;
