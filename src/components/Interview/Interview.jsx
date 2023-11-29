import React from 'react';
import styles from './Interview.module.css';
import InterviewInput from './InterviewInput';
import InterviewItems from './InterviewItems';
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

const Interview = ({
  interviews,
  questions,
  setInterviews,
  db,
  syncInterviewItemWithFirestore,
  syncQuestionItemWithFirestore,
  onSelectInterview,
  selectedInterview,
  currentUser,
  isCompleted,
  setIsCompleted,
}) => {
  const handleInterviewEdit = async (updatedText, id) => {
    setInterviews(
      interviews.map((interview) => {
        if (interview.id === id) {
          return {
            ...interview,
            text: updatedText,
          };
        }
        return interview;
      })
    );
    handleEditSync(updatedText, id);
  };

  const handleEditSync = async (updatedText, id) => {
    const interviewItemRef = doc(db, 'interviewItem', id);
    await updateDoc(interviewItemRef, {
      text: updatedText,
    });
    syncInterviewItemWithFirestore();
  };

  const handleInterviewSubmit = async (enteredOption, enteredInterview) => {
    await addDoc(collection(db, 'interviewItem'), {
      text: `[${enteredOption}] ${enteredInterview}`,
      isFinished: false,
      createdTime: serverTimestamp(),
      userId: currentUser,
      isCompleted: false,
    });

    syncInterviewItemWithFirestore();
    const q = query(
      collection(db, 'interviewItem'),
      where('userId', '==', currentUser)
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().text === enteredInterview) {
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

  const handleInterviewDelete = async (id) => {
    const interviewItemRef = doc(db, 'interviewItem', id);
    await deleteDoc(interviewItemRef);

    const q = query(
      collection(db, 'questionItem'),
      where('interviewId', '==', id),
      where('userId', '==', currentUser)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });

    syncInterviewItemWithFirestore();
    syncQuestionItemWithFirestore();
  };

  const handleSelectedInterview = (id) => {
    onSelectInterview(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>면접 종류</h1>
      <InterviewInput onInterviewSubmit={handleInterviewSubmit} />
      <InterviewItems
        interviews={interviews}
        questions={questions}
        onInterviewEdit={handleInterviewEdit}
        onInterviewDelete={handleInterviewDelete}
        db={db}
        onSelectInterview={handleSelectedInterview}
        selectedInterview={selectedInterview}
      />
    </div>
  );
};

export default Interview;
