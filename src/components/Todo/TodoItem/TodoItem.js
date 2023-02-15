import Buttons from "./Buttons";
import styles from './TodoItem.module.css';

const TodoItem = (props) => {

  const onDelete = (id) => {
    props.onDelete(id);
  }
  
  return (
    <div>
      {props.item.map((todo) => (
        <div className={styles.textAndDeteteBtn} key={todo.id}>
          <div className={styles.text}>{todo.text}</div>
          <Buttons onDelete={onDelete} todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoItem;