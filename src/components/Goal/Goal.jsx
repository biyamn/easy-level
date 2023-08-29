import React from "react";
import styles from "./Goal.module.css";
import GoalInput from "./GoalInput";
import GoalItems from "./GoalItems";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Goal = ({ goals, setGoals, db, syncGoalItemWithFirestore }) => {
  const handleGoalSubmit = async (enteredGoal) => {
    await addDoc(collection(db, "goalItem"), {
      text: enteredGoal,
      createdTime: Math.floor(Date.now() / 1000),
    });

    syncGoalItemWithFirestore();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Goal</h1>
      <GoalInput onGoalSubmit={handleGoalSubmit} />
      <GoalItems goals={goals} />
    </div>
  );
};

export default Goal;
