import React from "react";
import styled from "styled-components";
import { signInWithRedirect, signOut } from "firebase/auth";

const TodoListAppBar = ({ provider, auth, currentUser }) => {
  // console.log("currenUser", currentUser);
  const loginWithGoogleButton = (
    <Button
      onClick={() => {
        // console.log("sign in clicked");
        signInWithRedirect(auth, provider);
      }}
    >
      로그인
    </Button>
  );
  const logoutButton = <Button onClick={() => signOut(auth)}>로그아웃</Button>;
  const button = currentUser === null ? loginWithGoogleButton : logoutButton;
  return (
    <AppBar>
      <Logo>Todo List App</Logo>
      {button}
    </AppBar>
  );
};

const AppBar = styled.div`
  background-color: #1a202c;
  position: sticky;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 2.2rem;
  color: #7eccf9;
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
`;

export default TodoListAppBar;
