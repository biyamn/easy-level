import { useState } from 'react';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import styles from './Todo.module.css';

const Todo = () => {
  const [displayInputs, setDisplayInputs] = useState([]);

  const onSaveGoal = (goal) => {
    setDisplayInputs([...displayInputs, goal]);
  }
  
  const onDelete = (id) => {
    setDisplayInputs(displayInputs.filter((todo) => todo.id !== id));
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>목표를 이루기 위해 <br/>해야 할 것들을 적어주세요!</h1>
      <TodoInput onSaveGoal={onSaveGoal} />
      <TodoList item={displayInputs} onDelete={onDelete} />
    </div>
  );
};

export default Todo;