import React, { useState, useEffect } from 'react';
import ItemList from '../../market/main/ItemList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getData, __getPost } from '../../../redux/modules/market/postSlice';
import option from './Option';

const MainContainer = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.marketPost.list);

  const [state, setState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  useEffect(() => {
    if (state === 'dog') {
      dispatch(getData({ state: '강아지' }));
    }
    if (state === 'cat') {
      dispatch(getData({ state: '고양이' }));
    }
    if (state === 'all') {
      dispatch(__getPost());
    }
  }, [dispatch, state]);

  return (
    <>
      <STsection>
        <STh1>멍냥마켓</STh1>
        <div className='button'>
          <select
            name='choice'
            onChange={handleChange}
            defaultValue={option[2].value}
          >
            {option.map((option) => (
              <option
                key={option.value}
                value={option.value}
                name={option.name}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </STsection>
      <ItemList list={list} />
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
