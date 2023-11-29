import React from 'react';
import InterviewItem from './InterviewItem';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const InterviewItems = ({
  goals,
  onGoalDelete,
  onGoalEdit,
  onSelectGoal,
  selectedGoal,
  todos,
}) => {
  const handleGoalDelete = (id) => onGoalDelete(id);

  const handleGoalEdit = (updatedText, id) => onGoalEdit(updatedText, id);

  const handleSelectedGoal = (id) => onSelectGoal(id);

  const DISABLED = '#adb3bb';
  const ABLED = '#a8dcfa';
  let backgroundColor = DISABLED;

  const mobileView = (
    <Mobile>
      <Carousel slide={true} interval={null}>
        {goals.map((goal) => {
          if (goal.id === selectedGoal) {
            backgroundColor = ABLED;
          } else {
            backgroundColor = DISABLED;
          }
          console.log(goal.id);
          return (
            <Carousel.Item key={goal.id}>
              <div style={{ padding: '2rem' }}>
                <InterviewItem
                  goal={goal}
                  todos={todos}
                  onGoalDelete={handleGoalDelete}
                  onGoalEdit={handleGoalEdit}
                  onSelectGoal={handleSelectedGoal}
                  backgroundColor={backgroundColor}
                  selectedGoal={selectedGoal}
                />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Mobile>
  );

  const desktopView = (
    <Desktop>
      {goals.map((goal) => {
        if (goal.id === selectedGoal) {
          backgroundColor = ABLED;
        } else {
          backgroundColor = DISABLED;
        }
        console.log(goal.id);
        return (
          <InterviewItem
            key={goal.id}
            goal={goal}
            todos={todos}
            onGoalDelete={handleGoalDelete}
            onGoalEdit={handleGoalEdit}
            onSelectGoal={handleSelectedGoal}
            backgroundColor={backgroundColor}
            selectedGoal={selectedGoal}
          />
        );
      })}
    </Desktop>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
};

const Desktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    display: none;
  }
`;

export default InterviewItems;
