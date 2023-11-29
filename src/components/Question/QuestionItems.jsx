import React from 'react';
import QuestionItem from './QuestionItem';
import styles from './QuestionItems.module.css';

const QuestionItems = ({
  questions,
  onQuestionCheck,
  onQuestionDelete,
  onQuestionEdit,
  selectedInterview,
  db,
  currentUser,
}) => {
  const handleQuestionDelete = (id) => onQuestionDelete(id);

  const handleQuestionEdit = (updatedText, id) =>
    onQuestionEdit(updatedText, id);

  const handleQuestionCheck = (id) => onQuestionCheck(id);

  const selectedQuestions = questions.filter(
    (question) => question.interviewId === selectedInterview
  );

  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {selectedQuestions.map((question) => (
          <QuestionItem
            question={question}
            onQuestionDelete={handleQuestionDelete}
            key={question.id}
            onQuestionEdit={handleQuestionEdit}
            onQuestionCheck={handleQuestionCheck}
            db={db}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionItems;
