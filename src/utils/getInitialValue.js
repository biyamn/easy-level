const getInitialValue = (currentUser) => {
  return [
    {
      text: '[기술면접] JavaScript',
      createdTime: new Date(),
      isCompleted: false,
      userId: currentUser,
      todos: [
        {
          text: '호이스팅에 대해 설명해 주세요.',
          answer: '호이스팅이란~',
          isFinished: false,
          createdTime: new Date(),
          userId: currentUser,
        },
        {
          text: '클로저에 대해 설명해 주세요.',
          answer: '클로저란~',
          isFinished: false,
          createdTime: new Date(),
          userId: currentUser,
        },
      ],
    },
    {
      text: '[기술면접] React',
      createdTime: new Date(),
      isCompleted: false,
      userId: currentUser,
      todos: [
        {
          text: 'DOM과 Virtual DOM의 차이점에 대해 설명해 주세요.',
          answer: 'DOM이란~',
          isFinished: false,
          createdTime: new Date(),
          userId: currentUser,
        },
      ],
    },
  ];
};

export default getInitialValue;
