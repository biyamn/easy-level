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
      LOGIN WITH GOOGLE
    </Button>
  );
  const logoutButton = <Button onClick={() => signOut(auth)}>LOGOUT</Button>;
  const button = currentUser === null ? loginWithGoogleButton : logoutButton;
  return (
    <AppBar>
      <Logo>Todo List App</Logo>
      {button}
    </AppBar>
  );
};

const AppBar = styled.div`
  background-color: #dcf2ff;
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
  font-size: 1.5rem;
  color: #1861f4;
  font-weight: bold;
  margin: 0 2rem;
`;

const Button = styled.button`
  background-color: #6a9cff;
  color: white;
  border: none;
  font-size: 1rem;
  height: 3rem;
  cursor: pointer;
  margin: 0 2rem;
`;

export default TodoListAppBar;
