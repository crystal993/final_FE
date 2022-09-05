import React, { useState, useEffect } from 'react';
import ItemList from '../../market/main/ItemList';
import Button from '../../elements/GlobalButton';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getData, __getPost } from '../../../redux/modules/market/postSlice';

const MainContainer = () => {
  const dispatch = useDispatch();
  const [isDogClicked, setDogIsClicked] = useState(false);
  const [isCatClicked, setCatIsClicked] = useState(false);
  const [catState, setCatState] = useState('고양이 ');
  const [dogState, setDogState] = useState('강아지');

  const onCatData = () => {
    setCatIsClicked(!isDogClicked);
    if (isCatClicked) dispatch(getData({ state: '고양이 ' }));
  };

  const onDogData = () => {
    setDogIsClicked(!isDogClicked);
    if (isDogClicked) dispatch(getData({ state: '강아지' }));
  };

  const onPetData = () => {
    console.log('모두');
    if (isDogClicked && isCatClicked) dispatch(__getPost());
  };

  return (
    <>
      {isDogClicked && isCatClicked ? { onPetData } : null}
      <STsection>
        <STh1>멍냥마켓</STh1>
        <div className='button'>
          <Button
            content={'강아지'}
            height={'3.2rem'}
            fontSize={'1.4rem'}
            fontWeight={500}
            className='dog-btn'
            onClick={onDogData}
          />
          <Button
            content={'고양이'}
            height={'3.2rem'}
            fontSize={'1.4rem'}
            fontWeight={500}
            className='cat-btn'
            onClick={onCatData}
          />
        </div>
      </STsection>
      <ItemList />
    </>
  );
};

export default MainContainer;

const STsection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    gap: 0.5rem;
  }
`;

const STh1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;
