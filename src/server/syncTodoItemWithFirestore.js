import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { key } from "../../key";

const firebaseConfig = key;
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const syncTodoItemWithFirestore = (setDisplayInputs) => {
  getDocs(collection(db, "todoItem")).then((querySnapshot) => {
    const firestoreTodoItemList = [];
    querySnapshot.forEach((doc) => {
      firestoreTodoItemList.push({
        id: doc.id,
        text: doc.data().text,
        isFinished: doc.data().isFinished,
      });
    });
    setDisplayInputs(firestoreTodoItemList);
  });
};
