import React from 'react';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';

const Navbar = ({ auth, currentUser, todayString }) => {
  const logoutButton = <Button onClick={() => signOut(auth)}>로그아웃</Button>;
  const button = currentUser !== null && logoutButton;

  return (
    <Container>
      <img
        src="src\assets\logo.png"
        width="200px"
        style={{ margin: '0 2rem' }}
      />
      <Wrapper>
        <Date>{todayString}</Date>
        {button}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #1a202c;
  position: fixed;
  z-index: 1;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Date = styled.div`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  margin: 0 2rem;
`;

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

export default Navbar;
