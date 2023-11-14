import React from 'react';
import styles from './Goal.module.css';
import GoalInput from './GoalInput';
import GoalItems from './GoalItems';
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const Goal = ({
  goals,
  todos,
  setGoals,
  db,
  syncGoalItemWithFirestore,
  syncTodoItemWithFirestore,
  onSelectGoal,
  selectedGoal,
  currentUser,
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
    const goalItemRef = doc(db, 'goalItem', id);
    await updateDoc(goalItemRef, {
      text: updatedText,
    });
    syncGoalItemWithFirestore();
  };

  const handleGoalSubmit = async (enteredType, enteredGoal) => {
    await addDoc(collection(db, 'goalItem'), {
      text: `${enteredType}/${enteredGoal}`,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      userId: currentUser,
      isCompleted: false,
    });

    syncGoalItemWithFirestore();
    const q = query(
      collection(db, 'goalItem'),
      where('userId', '==', currentUser)
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
    const goalItemRef = doc(db, 'goalItem', id);
    await deleteDoc(goalItemRef);

    const q = query(
      collection(db, 'todoItem'),
      where('goalId', '==', id),
      where('userId', '==', currentUser)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });

    syncGoalItemWithFirestore();
    syncTodoItemWithFirestore();
  };

  const handleSelectedGoal = (id) => {
    onSelectGoal(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>면접 종류</h1>
      <GoalInput onGoalSubmit={handleGoalSubmit} />
      <GoalItems
        goals={goals}
        todos={todos}
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
