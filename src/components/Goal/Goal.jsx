import React, { useState } from "react";
import styles from "./Goal.module.css";
import GoalInput from "./GoalInput";
import GoalItems from "./GoalItems";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Goal = ({
  goals,
  setGoals,
  db,
  syncGoalItemWithFirestore,
  syncTodoItemWithFirestore,
  onSelectGoal,
  selectedGoal,
  currentUser,
  year,
  isCompleted,
  setIsCompleted,
}) => {
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
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      userId: currentUser,
      isCompleted: false, // Todo
    });

    syncGoalItemWithFirestore();
    // firestore에서 방금 만든 goal의 id 가져오기
    const q = query(
      collection(db, "goalItem"),
      where("userId", "==", currentUser)
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().text === enteredGoal) {
          setIsCompleted([
            ...isCompleted,
            {
              id: doc.id,
              isCompleted: false,
            },
          ]);
        }
      });
    });
  };

  const handleGoalDelete = async (id) => {
    const goalItemRef = doc(db, "goalItem", id);
    await deleteDoc(goalItemRef);

    // todoItem의 goalId가 id와 같으면 해당 item 삭제
    const q = query(
      collection(db, "todoItem"),
      where("goalId", "==", id),
      where("userId", "==", currentUser)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });

    syncGoalItemWithFirestore();
    syncTodoItemWithFirestore(); // 오류
  };

  const handleGoalCheck = async (id) => {
    const goalItemRef = doc(db, "goalItem", id);

    await updateDoc(goalItemRef, {
      isFinished: !goals.find((goal) => goal.id === id).isFinished,
    });
    syncGoalItemWithFirestore();
  };

  const handleSelectedGoal = (id) => {
    onSelectGoal(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{year}년 목표</h1>
      <GoalInput onGoalSubmit={handleGoalSubmit} />
      <GoalItems
        goals={goals}
        onGoalCheck={handleGoalCheck}
        onGoalEdit={handleGoalEdit}
        onGoalDelete={handleGoalDelete}
        db={db}
        onSelectGoal={handleSelectedGoal}
        selectedGoal={selectedGoal}
      />
    </div>
  );
};

export default Goal;
