import React from "react";
import styled from "styled-components";

const Modal = ({
  children,
  visible,
  handleModalClose,
  handleConfirmAction,
}) => {
  return (
    <>
      <ModalOverlay />
      <ModalWrapper>
        {children}
        <Buttons>
          <Button onClick={handleModalClose}>취소</Button>
          <Button onClick={handleConfirmAction}>확인</Button>
        </Buttons>
      </ModalWrapper>
    </>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  /* display: ${(props) => (props.visible ? "block" : "none")}; */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* display: ${(props) => (props.visible ? "block" : "none")}; */
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  height: 200px;
  max-width: 480px;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
`;

const Buttons = styled.div`
  margin-top: 50px;
  padding: 0 100px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button`
  height: 30px;
  width: 50px;
  border: 1px solid transparent;
  color: black;
  background: #bdaaff;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;

  &:hover,
  &:active {
    background: #9172ff;
    border-color: transparent;
    color: black;
  }
`;

export default Modal;
