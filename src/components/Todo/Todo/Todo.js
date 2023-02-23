import { useState } from 'react';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import styles from './Todo.module.css';

const Todo = () => {
  const [displayInputs, setDisplayInputs] = useState([]);

  const submitEditedContent = (updatedText, id) => {
    setDisplayInputs(displayInputs.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text: updatedText
        };
      }
      return todo;
    }))
  }

  const onSaveGoal = (goal) => {
    setDisplayInputs([...displayInputs, goal]);
  }
  
  const onDelete = (id) => {
    setDisplayInputs(displayInputs.filter((todo) => todo.id !== id));
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>ToDo</h1>
        </div>
        <TodoInput onSaveGoal={onSaveGoal} />
      </div>
      <TodoList item={displayInputs} onDelete={onDelete} submitEditedContent={submitEditedContent} />
    </div>
  );
};

export default Todo;