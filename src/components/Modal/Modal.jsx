import React from "react";
import styled from "styled-components";

const Modal = ({ children, visible, handleModalClose }) => {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible}>
        <button onClick={handleModalClose}>X</button>
        {children}
      </ModalWrapper>
    </>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
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
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px;
  top: 50%;
  transform: translateY(-50%);
`;

export default Modal;
