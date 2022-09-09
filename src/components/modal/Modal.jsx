import React from 'react';
import styled from 'styled-components';
import Button from '../elements/GlobalButton';

const Modal = ({ onClose, content, moveLogin, name }) => {
  return (
    <Wrapper className='modal'>
      {/* Modal content */}
      <div className='modal-content'>
        <p className='content'>{content}</p>
        <section className='modal-btn'>
          <Button content={name} onClick={moveLogin}></Button>
          <Button content={'닫기'} onClick={onClose}></Button>
        </section>
      </div>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 20%;
  width: 100%;
  height: max-content;

  .modal-content {
    background-color: #fefefe;
    margin: 0 auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    border-radius: 20px;
    width: 30%; /* Could be more or less, depending on screen size */
    @media (max-width: 768px) {
      width: 18rem;
    }
    @media (min-width: 769px) and (max-width: 1023px) {
      width: 23rem;
    }
    @media (min-width: 1024px) {
      width: 28rem;
    }
    height: 200px;
    p {
      text-align: center;
    }
    Button {
      margin-top: 5rem;
    }

    .modal-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
`;
