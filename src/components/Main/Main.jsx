import React from "react";
import styled from "styled-components";
const Main = () => {
  const Title = () => {
    return (
      <div>
        <TitleText>현황</TitleText>
        <TitleDescription></TitleDescription>
      </div>
    );
  };

  const Status = () => {
    return (
      <div>
        <StatusText></StatusText>
        <StatusDescription></StatusDescription>
      </div>
    );
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
  justify-content: center;
  flex: 3;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
`;

const TitleText = styled.h1`
  color: white;
`;

const StatusText = styled.h1`
  color: white;
`;

const TitleDescription = styled.div`
  color: white;
`;

const StatusDescription = styled.div`
  color: white;
`;

export default Main;
