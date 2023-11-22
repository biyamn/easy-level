import React from 'react';
import styled from 'styled-components';
const Main = ({ status }) => {
  const Title = () => {
    return (
      <TitleWrapper>
        <TitleText>현황</TitleText>
        {/* <TitleDescription>면접 준비 현황에 대해 알려드려요.</TitleDescription> */}
      </TitleWrapper>
    );
  };

  const Status = () => {
    const text = status.map((item) => {
      console.log('item: ', item);
      return (
        <div key={item.id}>
          <span>{item.text}</span>
          <span>{item.status}</span>
          <span>{item.percent}%</span>
        </div>
      );
    });

    return <StatusText>{text}</StatusText>;
  };

  return (
    <Container>
      <Wrapper>
        <Title />
        <Status />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 3;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  white-space: pre-line;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.h1`
  color: white;
`;

const StatusText = styled.div`
  color: white;
`;

const TitleDescription = styled.div`
  color: white;
`;

const StatusDescription = styled.div`
  color: white;
`;

export default Main;
