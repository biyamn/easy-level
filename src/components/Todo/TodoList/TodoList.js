import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

const TodoList = (props) => {
  const onDelete = (id) => props.onDelete(id);

  const submitEditedContent = (updatedText, id) =>
    props.submitEditedContent(updatedText, id);

  return (
    <div className={styles.container}>
      {props.item.map((todo) => (
        <TodoItem
          todo={todo}
          onDelete={onDelete}
          key={todo.id}
          submitEditedContent={submitEditedContent}
        />
      ))}
    </div>
  );
};

export default TodoList;
