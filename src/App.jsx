// zod nicemodal react hook form

import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Question from './components/Question/Question';
import Interview from './components/Interview/Interview';
import Navbar from './components/Header';
import Main from './components/Status';
import { initializeApp } from 'firebase/app';
import getInitialValue from './utils/getInitialValue';
import { signInWithPopup } from 'firebase/auth';
import { styled } from 'styled-components';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDERID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = import.meta.env;

const config = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDERID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseConfig = config;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const today = new Date();
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const day = WEEKDAY[today.getDay()];
const todayString = `${year}년 ${month}월 ${date}일 (${day})`;

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCompleted, setIsCompleted] = useState([]);
  const [status, setStatus] = useState([]);

  const statusHandler = () => {
    let statusArray = [];
    interviews.map((interview) => {
      const filteredQuestions = questions.filter(
        (question) => question.interviewId === interview.id
      );

      const completedQuestionsLength = filteredQuestions.filter(
        (question) => question.isFinished === true
      ).length;

      const result = `${completedQuestionsLength} / ${filteredQuestions.length} `;
      const percent =
        filteredQuestions.length === 0
          ? 0
          : Math.floor(
              (completedQuestionsLength / filteredQuestions.length) * 100
            );
      statusArray.push({
        id: interview.id,
        status: result,
        text: interview.text,
        percent: percent,
      });
    });
    console.log('status: ', status);
    console.log('statusArray: ', statusArray);
    setStatus(statusArray);
  };

  const handleSelectedInterview = (id) => {
    if (id === selectedInterview) {
      setSelectedInterview(null);
    } else {
      setSelectedInterview(id);
    }
  };

  // 초기값 설정
  // 아예 속성에 questions를 넣어버린다(firestore에는 없음)
  // 여기 questions에는 interviewId가 없음
  // interview, question에 id도 모두 없음(firestore가 만들어 줄 거임)

  // syncInterviewItemWithFirestore, syncQuestionItemWithFirestore: firestore에서 데이터를 가져와서 state에 저장
  // firebase에 데이터를 보내는 함수 아님. 가져와서 state에 저장하는 함수임
  // 그래서 여기서 바꿀 건 없음
  const syncInterviewItemWithFirestore = async () => {
    const q = query(
      collection(db, 'interviewItem'),
      where('userId', '==', currentUser),
      orderBy('createdTime', 'asc')
    );
    await getDocs(q).then((querySnapshot) => {
      const firestoreInterviewItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreInterviewItemList.push({
          id: doc.id,
          text: doc.data().text,
          createdTime: doc.data().createdTime,
          isCompleted: doc.data().isCompleted,
          userId: doc.data().userId,
        });
      });
      setInterviews(firestoreInterviewItemList);
    });
  };

  const syncQuestionItemWithFirestore = async () => {
    const q = query(
      collection(db, 'questionItem'),
      where('userId', '==', currentUser),
      orderBy('createdTime', 'asc')
    );
    await getDocs(q).then((querySnapshot) => {
      const firestoreQuestionItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreQuestionItemList.push({
          id: doc.id,
          text: doc.data().text,
          answer: doc.data().answer,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime,
          interviewId: doc.data().interviewId,
          userId: doc.data().userId,
        });
      });
      setQuestions(firestoreQuestionItemList);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    statusHandler();
  }, [questions]);

  // 여기를 추가했다
  useEffect(() => {
    if (!currentUser) return;

    // 맨 처음에 firebase에서 'interviewItem' 데이터를 가져오는 쿼리를 작성함
    const initialValue = getInitialValue(currentUser);
    const q = query(
      collection(db, 'interviewItem'),
      where('userId', '==', currentUser),
      orderBy('createdTime', 'asc')
    );
    // 쿼리로 데이터를 가져옴(getDocs)
    getDocs(q)
      .then((querySnapshot) => {
        // 가져온 interviewItem이 없을 때. 즉 계정이 처음 만들어졌을 때
        if (querySnapshot.size === 0) {
          // 구조분해할당으로 initialValue에서 questions와 ...interview을 나눠서 가져옴(interview은 꼭 interview이 아니어도 됨. 그냥 나머지라는 뜻임)
          return Promise.all(
            initialValue.map(async ({ questions, ...interview }) => {
              // interview을 추가하는 부분. 추가로 끝나는 . 게아니라 interviewResponse라는 변수에 저장한다.
              const interviewResponse = await addDoc(
                collection(db, 'interviewItem'),
                interview
              );

              // question를 추가하는 부분. questions에서 id를 받아 question의 interviewId로 등록하여 firestore에 저장한다.
              await Promise.all(
                questions.map(
                  async (question) =>
                    await addDoc(collection(db, 'questionItem'), {
                      ...question,
                      interviewId: interviewResponse.id,
                      answer: '이곳에 답변을 입력해주세요.',
                      isFinished: false,
                      userId: currentUser,
                    })
                )
              );
            })
          );
        }
      })
      .finally(() => {
        syncInterviewItemWithFirestore();
        syncQuestionItemWithFirestore();
      });
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className={styles.App}>
        <Navbar
          auth={auth}
          currentUser={currentUser}
          todayString={todayString}
        />
        <div className={styles.layout}>
          <h3 style={{ marginBottom: '30px' }}>로그인이 필요합니다.</h3>
          <Button onClick={() => signInWithPopup(auth, provider)}>
            로그인하기
          </Button>
        </div>
      </div>
    );
  }

  console.log('status in app: ', status);
  return (
    <div className={styles.App}>
      <Navbar
        provider={provider}
        auth={auth}
        currentUser={currentUser}
        todayString={todayString}
        selectedInterview={selectedInterview}
        setSelectedInterview={setSelectedInterview}
      />
      <div className={styles.box}>
        <Interview
          db={db}
          interviews={interviews}
          questions={questions}
          setInterviews={setInterviews}
          syncInterviewItemWithFirestore={syncInterviewItemWithFirestore}
          syncQuestionItemWithFirestore={syncQuestionItemWithFirestore}
          onSelectInterview={handleSelectedInterview}
          selectedInterview={selectedInterview}
          currentUser={currentUser}
          year={year}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
        {selectedInterview ? (
          <Question
            db={db}
            questions={questions}
            interviews={interviews}
            setQuestions={setQuestions}
            syncQuestionItemWithFirestore={syncQuestionItemWithFirestore}
            syncInterviewItemWithFirestore={syncInterviewItemWithFirestore}
            selectedInterview={selectedInterview}
            currentUser={currentUser}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />
        ) : (
          <Main status={status} />
        )}
      </div>
    </div>
  );
};

const Button = styled.button`
  background-color: transparent;
  color: #a8dcfa;
  border: none;
  font-size: 1.5rem;
  height: 3rem;
  cursor: pointer;
  margin: 0 2rem;
  font-weight: bold;
  padding: 0;
`;

export default App;
