// setDisplayInputs를 여기로 가져올 방법을 못찾아서 App으로 이 코드를 일단 옮김

// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { key } from "../../key";

// const firebaseConfig = key;
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const syncTodoItemWithFirestore = (setDisplayInputs) => {
//   getDocs(collection(db, "todoItem")).then((querySnapshot) => {
//     const firestoreTodoItemList = [];
//     querySnapshot.forEach((doc) => {
//       firestoreTodoItemList.push({
//         id: doc.id,
//         text: doc.data().text,
//         isFinished: doc.data().isFinished,
//       });
//     });
//     setDisplayInputs(firestoreTodoItemList);
//   });
// };
