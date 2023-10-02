import React from "react";
import styled from "styled-components";
const User = () => {
  console.log("user 시작");
  const Title = () => {
    return (
      <div>
        <TitleText>[오늘부터 세우는 올해 목표]</TitleText>
        <TitleDescription>
          올해의 목표를 세워보아요. 바로 오늘이 남은 올해의 첫 날이에요!
        </TitleDescription>
      </div>
    );
  };

  const Status = () => {
    return (
      <div>
        <StatusText>[현황]</StatusText>
        <StatusDescription>0%</StatusDescription>
      </div>
    );
  };

  return (
    <Container>
      <Title />
      <Status />
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  flex: 3;
  white-space: pre-line;
  justify-content: center;
  align-items: center;
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

export default User;
