import React, { useState, useEffect } from 'react';
import QuestionInput from './QuestionInput';
import QuestionItems from './QuestionItems';

import styles from './Question.module.css';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

const Question = ({
  db,
  questions,
  setQuestions,
  syncQuestionItemWithFirestore,
  syncInterviewItemWithFirestore,
  selectedInterview,
  currentUser,
}) => {
  const handleQuestionEdit = async (updatedText, id) => {
    setQuestions(
      questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            answer: updatedText,
          };
        }
        return question;
      })
    );
    handleEditSync(updatedText, id);
  };

  const handleEditSync = async (updatedText, id) => {
    const questionItemRef = doc(db, 'questionItem', id);
    await updateDoc(questionItemRef, {
      answer: updatedText,
    });
    syncQuestionItemWithFirestore();
  };

  const handleQuestionSubmit = async (enteredQuestion) => {
    await addDoc(collection(db, 'questionItem'), {
      text: enteredQuestion,
      answer: '이곳에 답변을 작성해 주세요.',
      isFinished: false,
      createdTime: serverTimestamp(),
      interviewId: selectedInterview,
      userId: currentUser,
    });

    syncQuestionItemWithFirestore();
  };

  const handleQuestionDelete = async (id) => {
    const questionItemRef = doc(db, 'questionItem', id);
    await deleteDoc(questionItemRef);
    syncQuestionItemWithFirestore();
  };

  const handleQuestionCheck = async (id) => {
    const questionItemRef = doc(db, 'questionItem', id);
    console.log(
      'questions.find((question) => question.id === id).isFinished',
      questions.find((question) => question.id === id).isFinished
    );
    await updateDoc(questionItemRef, {
      isFinished: !questions.find((question) => question.id === id).isFinished,
    });
    syncQuestionItemWithFirestore();
  };

  useEffect(() => {
    const filteredQuestions = questions.filter(
      (question) => question.interviewId === selectedInterview
    );
    if (filteredQuestions.length === 0) return;
    const newIsAllFinished = filteredQuestions.every(
      (item) => item.isFinished === true
    );
    // interview의 isCompleted를 바꾸기
    const interviewItemRef = doc(db, 'interviewItem', selectedInterview);
    updateDoc(interviewItemRef, {
      isCompleted: newIsAllFinished,
    });
    syncInterviewItemWithFirestore();
  }, [questions]);

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>예상 질문</h1>
        </div>
        <QuestionInput onQuestionSubmit={handleQuestionSubmit} />
      </div>
      <QuestionItems
        db={db}
        questions={questions}
        onQuestionCheck={handleQuestionCheck}
        onQuestionEdit={handleQuestionEdit}
        onQuestionDelete={handleQuestionDelete}
        selectedInterview={selectedInterview}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Question;
