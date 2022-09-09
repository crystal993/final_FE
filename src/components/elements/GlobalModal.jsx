import React, { useState } from 'react';
import ModalPortal from '../modal/Portal';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

const GlobalModal = ({ content, name }) => {
  const [modalOn, setMoadlOn] = useState(true);
  const handleModal = () => {
    setMoadlOn(!modalOn);
  };
  const navigate = useNavigate();
  const moveLogin = () => {
    navigate('/login');
  };

  // 모달 함수 전달
  return (
    <div>
      {/* 모달 확인하기 위해 / 실제로 사용할때는 닫기 버튼만 사용함*/}
      {/* <button onClick={handleModal}>토글 버튼</button> */}
      <ModalPortal>
        {modalOn && (
          <Modal
            onClose={handleModal}
            content={content}
            moveLogin={moveLogin}
            name={name}
          />
        )}
      </ModalPortal>
    </div>
  );
};

export default GlobalModal;
