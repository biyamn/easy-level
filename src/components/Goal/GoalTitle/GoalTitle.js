import styles from './GoalTitle.module.css';

const GoalTitle = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.input}</div>
    </div>
  );
};

export default GoalTitle;