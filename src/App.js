import styles from'./App.module.css';
import Todo from './components/Todo/Todo/Todo';
import Goal from './components/Goal/Goal/Goal';

const App = () => {
  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <Goal />
        <Todo />
      </div>
    </div>
  );
}

export default App;
