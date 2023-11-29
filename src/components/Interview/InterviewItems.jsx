import React from 'react';
import InterviewItem from './InterviewItem';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const InterviewItems = ({
  interviews,
  onInterviewDelete,
  onInterviewEdit,
  onSelectInterview,
  selectedInterview,
  questions,
}) => {
  const handleInterviewDelete = (id) => onInterviewDelete(id);

  const handleInterviewEdit = (updatedText, id) =>
    onInterviewEdit(updatedText, id);

  const handleSelectedInterview = (id) => onSelectInterview(id);

  const DISABLED = '#adb3bb';
  const ABLED = '#a8dcfa';
  let backgroundColor = DISABLED;

  const mobileView = (
    <Mobile>
      <Carousel slide={true} interval={null}>
        {interviews.map((interview) => {
          if (interview.id === selectedInterview) {
            backgroundColor = ABLED;
          } else {
            backgroundColor = DISABLED;
          }
          console.log(interview.id);
          return (
            <Carousel.Item key={interview.id}>
              <div style={{ padding: '2rem' }}>
                <InterviewItem
                  interview={interview}
                  questions={questions}
                  onInterviewDelete={handleInterviewDelete}
                  onInterviewEdit={handleInterviewEdit}
                  onSelectInterview={handleSelectedInterview}
                  backgroundColor={backgroundColor}
                  selectedInterview={selectedInterview}
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
      {interviews.map((interview) => {
        if (interview.id === selectedInterview) {
          backgroundColor = ABLED;
        } else {
          backgroundColor = DISABLED;
        }
        console.log(interview.id);
        return (
          <InterviewItem
            key={interview.id}
            interview={interview}
            questions={questions}
            onInterviewDelete={handleInterviewDelete}
            onInterviewEdit={handleInterviewEdit}
            onSelectInterview={handleSelectedInterview}
            backgroundColor={backgroundColor}
            selectedInterview={selectedInterview}
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
