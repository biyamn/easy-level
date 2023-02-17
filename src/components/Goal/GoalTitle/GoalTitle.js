import styles from "./GoalTitle.module.css";

const GoalTitle = (props) => {
  return (
    <div className={styles.container}>
      {props.input.map((goal) => (
        <div className={styles.title} key={goal}>{goal}</div>
      ))}
    </div>
  );
};

export default GoalTitle;
