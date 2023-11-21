const getInitialValue = (currentUser) => {
  return [
    {
      text: '[기술면접] HTML',
      createdTime: new Date(),
      isCompleted: false,
      userId: currentUser,
      todos: [
        {
          text: 'DOM과 Virtual DOM의 차이점에 대해 설명해 주세요.',
        },
        {
          text: '시맨틱 마크업에 대해 설명해 주세요.',
        },
        { text: '시맨틱 태그를 어떤 용도로 사용해야 하는지 설명해 주세요.' },
      ],
    },
    {
      text: '[기술면접] CSS',
      createdTime: new Date(),
      isCompleted: false,
      userId: currentUser,
      todos: [
        { text: '박스 모델에 대해 설명해 주세요.' },
        { text: '박스 사이징에 대해 설명해 주세요.' },
        { text: 'CSS 적용 우선순위에 대해 설명해 주세요.' },
        { text: '쌓임 맥락에 대해 설명해 주세요.' },
        { text: 'z-index에 대해 설명해 주세요.' },
        { text: 'media-query에 대해 설명해 주세요.' },
      ],
    },
    {
      text: '[기술면접] JavaScript',
      createdTime: new Date(),
      isCompleted: false,
      userId: currentUser,
      todos: [
        { text: '원시 타입과 참조 타입에는 어떤 것들이 있는지 설명해 주세요.' },
        {
          text: '원시 타입과 참조 타입의 차이점과 그러한 차이로 인해 어떤 현상이 발행할 수 있는지 설명해 주세요.',
        },
        { text: '얕은 복사와 깊은 복사의 차이점에 대해 설명해 주세요.' },
        { text: '깊은 복사를 하는 방법에 대해 설명해 주세요.' },
        { text: '변수를 선언하는 키워드들의 차이점에 대해 설명해 주세요' },
        { text: '변수를 선언하는 키워드들의 스코프에 대해 설명해 주세요.' },
        { text: '호이스팅에 대해 설명해 주세요.' },
        {
          text: 'let, const 선언문 이전에 참조를 하게 되면 어떤 현상이 발생하는지 설명해 주세요.',
        },
        {
          text: '자바스크립트에서 비동기를 처리하는 방법에 대해 설명해 주세요.',
        },
        {
          text: 'Promise와 async/await에 대해 설명하고 각각 에러 핸들링을 어떻게 하는지도 설명해 주세요.',
        },
        { text: '동기와 비동기에 대해 설명해 주세요.' },
        { text: '콜백함수에 대해 설명해 주세요.' },
        { text: '콜백지옥의 의미와 콜백지옥을 해결하는 방법을 설명해주세요.' },
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
        },
        { text: '최근 사용해본 Hooks에 대해 설명해 주세요.' },
      ],
    },

    {
      text: '[기술면접] 프론트엔드',
      createdTime: new Date(),
      isCompleted: false,
      userId: currentUser,
      todos: [
        { text: '브라우저 렌더링 과정에 대해 설명해 주세요.' },
        {
          text: 'API 호출을 할 때 어떤 메소드를 어떤 용도로 사용하는지 설명해 주세요.',
        },
        { text: 'PUT과 PATCH의 차이점에 대해 설명해 주세요.' },
        { text: '상태코드 400번대와 500번대의 차이점에 대해 설명해 주세요.' },
        { text: 'ReFlow와 RePaint에 대해 설명해 주세요.' },
        { text: '쿠키와 세션에 대해 설명해 주세요.' },
        { text: 'CORS에 대해 설명해 주세요.' },
        {
          text: '서버사이드 렌더링과 클라이언트사이드 렌더링의 차이점에 대해 설명해 주세요.',
        },
        { text: 'RESTful API에 대해 설명해 주세요.' },
      ],
    },
    // TODO: 기술면접 외 다른 카테고리 질문 추가
  ];
};

export default getInitialValue;
