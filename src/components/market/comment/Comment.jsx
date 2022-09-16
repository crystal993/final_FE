import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCommentData,
  postCommentData,
  deleteCommentData,
  putCommentData,
} from '../../../redux/modules/market/commentSlice';
import GlobalButton from './../../elements/GlobalButton';

const Comment = ({ id }) => {
  const dispatch = useDispatch();

  //    댓글 리덕스 상태 조회
  const state = useSelector((state) => state.comment.comment);
  //   댓글 comment_data
  const comment_data = state;
  console.log(comment_data);

  //   입력받은 값
  const [input, setInput] = useState('');

  const onChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const onPostHandler = (event) => {
    event.preventDefault();
    // postId 와 content를 같이 보냄
    let body = {
      itemId: id,
      content: input,
    };
    dispatch(postCommentData(body));
    setInput('');
  };

  //   컴포넌트 마운트 시에 id에 해당하는 댓글을 가져옴
  useEffect(() => {
    dispatch(getCommentData({ itemId: id }));
  }, []);

  return (
    <>
      <Wrapper>
        <Label>
          <Input
            placeholder='댓글을 입력해 주세요'
            name='input'
            value={input}
            onChange={onChangeHandler}
          />
          <button onClick={onPostHandler}>
            <span>등록</span>
          </button>
        </Label>
        {comment_data.length === 0 ? (
          <section className='no-comment'>
            <p>아직 댓글이 없어요</p>
            <p>가장 먼저 댓글을 남겨 보세요.</p>
          </section>
        ) : (
          comment_data &&
          comment_data.map((item, index) => (
            <section key={index} className='comment-section'>
              <h2>{item.nickname}</h2>
              <p>{item.content}</p>
              {/* ismine인지 확인하여 버튼 조건부 랜더링 */}
              <button
                content={'수정'}
                onClick={() => {
                  dispatch(
                    putCommentData({
                      itemId: id,
                      content: input,
                      commentId: item.commentId,
                    })
                  );
                  setInput('');
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  dispatch(
                    deleteCommentData({ itemId: id, commentId: item.commentId })
                  );
                }}
              >
                삭제
              </button>
            </section>
          ))
        )}
      </Wrapper>
    </>
  );
};

export default Comment;

const Wrapper = styled.div`
  width: 100%;
  min-height: 24.5rem;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10rem;

  .comment-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin-left: 10rem;
    gap: 10px;

    button {
      cursor: pointer;
    }

    button:hover {
      background: #f0f0f0;
    }
  }

  .no-comment {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
    text-align: center;
    color: #cbcbcb;
    margin-top: 2.9rem;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    @media screen and (min-width: 1024px) {
      /* Desktop */
      width: 90%;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      /* Tablet */
      width: 95%;
    }

    @media screen and (max-width: 767px) {
      /* Mobile */
      width: 98%;
    }
    margin: 0 auto;
    background: #b63eff;
    padding: 1rem;
    span {
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 2.3rem;
      text-align: center;
      color: #ffffff;
    }
    border: 1px solid gray;
  }

  .btn:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 32.8rem;
  height: 4rem;
  border: 0.2rem solid #cbcbcb;
  border-radius: 0.4rem;
  margin-top: 2.9rem;
  margin-left: 1.6rem;
  margin-right: 1.6rem;
  font-size: 1.4rem;
`;

const Label = styled.label`
  position: relative;
  margin-bottom: 5rem;
  button {
    position: absolute;
    top: 50%;
    right: 0;
    border: 2px solid #cbcbcb;
    border-radius: 0.6rem;
    height: 4rem;
    background: #cbcbcb;
    border-radius: 4px;
    width: 5rem;
    height: 2.8rem;
    transform: translateX(-50%);
    span {
      color: #ffffff;
    }
  }

  button:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;
