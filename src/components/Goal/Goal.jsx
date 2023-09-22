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
  const handleGoalEdit = async (updatedText, id) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === id) {
          return {
            ...goal,
            text: updatedText,
          };
        }
        return goal;
      })
    );
    handleEditSync(updatedText, id);
  };

  const handleEditSync = async (updatedText, id) => {
    const goalItemRef = doc(db, "goalItem", id);
    await updateDoc(goalItemRef, {
      text: updatedText,
    });
    syncGoalItemWithFirestore();
  };

  const handleGoalSubmit = async (enteredGoal) => {
    await addDoc(collection(db, "goalItem"), {
      text: enteredGoal,
      createdTime: Math.floor(Date.now() / 1000),
    });

    syncGoalItemWithFirestore();
  };

  const handleGoalDelete = async (id) => {
    const goalItemRef = doc(db, "goalItem", id);
    await deleteDoc(goalItemRef);
    syncGoalItemWithFirestore();
  };

  const handleGoalCheck = async (id) => {
    const goalItemRef = doc(db, "goalItem", id);

    await updateDoc(goalItemRef, {
      isFinished: !goals.find((goal) => goal.id === id).isFinished,
    });
    syncGoalItemWithFirestore();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Goal</h1>
      <GoalInput onGoalSubmit={handleGoalSubmit} />
      <GoalItems
        goals={goals}
        onGoalCheck={handleGoalCheck}
        onGoalEdit={handleGoalEdit}
        onGoalDelete={handleGoalDelete}
        db={db}
        syncGoalItemWithFirestore={syncGoalItemWithFirestore}
      />
    </div>
  );
};

export default Goal;
