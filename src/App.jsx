import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Todo from "./components/Todo/Todo/Todo";
import Goal from "./components/Goal/Goal/Goal";
import { syncTodoItemWithFirestore } from "./server/syncTodoItemWithFirestore";
import { db } from "./server/syncTodoItemWithFirestore";

const App = () => {
  const [displayInputs, setDisplayInputs] = useState([]);

  useEffect(() => {
    syncTodoItemWithFirestore(setDisplayInputs);
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
