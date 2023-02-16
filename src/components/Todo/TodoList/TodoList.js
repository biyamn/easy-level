import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

const TodoList = (props) => {
  const onDelete = (id) => props.onDelete(id);
  
  return (
    <div className={styles.container}>
      {props.item.map((todo) => (
        <TodoItem todo={todo} onDelete={onDelete}/>
      ))}
    </div>
  );
};

export default TodoList;