import React from "react";
import styled from "styled-components";

const GoalItem = ({ goal }) => {
  return (
    <Container>
      <Title>{goal.text}</Title>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 5%;
  width: 15rem;
  height: 10rem;
  margin-bottom: 5%;
  margin-right: 5%;
`;

const Title = styled.div`
  font-size: 1rem;
  color: #1a202c;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export default GoalItem;
