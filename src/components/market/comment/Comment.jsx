import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentData,
  postCommentData,
  deleteCommentData,
  putCommentData,
} from "../../../redux/modules/market/commentSlice";
import GlobalButton from "./../../elements/GlobalButton";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile_img_sm.svg";
import GlobalModal from "../../elements/GlobalModal";

const Comment = ({ id }) => {
  const isLogin = useSelector((state) => state.user.userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.comment.comment);
  const comment_data = state;
  const [input, setInput] = useState("");

  const onChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const onPostHandler = (event) => {
    event.preventDefault();
    let body = {
      itemId: id,
      content: input,
    };
    dispatch(postCommentData(body));
    setInput("");
  };

  useEffect(() => {
    dispatch(getCommentData({ itemId: id }));
  }, []);

  const user = JSON.parse(localStorage.getItem("user-info"));
  const nickname = user?.nickname;

  const [isUpdateInput, setIsUpdateInput] = useState(false);
  const [updateInput, setUpdateInput] = useState();
  const onUpdateHandler = (commtentId) => {
    dispatch(
      putCommentData({
        itemId: id,
        content: updateInput,
        commentId: commtentId,
      })
    );
    setUpdateInput("");
    setIsUpdateInput(false);
  };
  const onUpdateChangeHandler = (event) => {
    setUpdateInput(event.target.value);
  };

  useEffect(() => {
    setUpdateInput(updateInput);
  }, [setUpdateInput, updateInput]);

  const moveLogin = () => {
    navigate("/login");
  };
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal && (
        <GlobalModal
          name={"로그인"}
          content1={"로그인이 필요한 서비스입니다."}
          content2={"로그인 하시겠습니까?"}
          isModal={isModal}
          setIsModal={setIsModal}
          onClick={moveLogin}
        />
      )}

      <Wrapper>
        <Label>
          <Input
            placeholder="댓글을 입력해 주세요"
            name="input"
            value={input}
            onChange={onChangeHandler}
          />
          <button onClick={onPostHandler}>
            <span>등록</span>
          </button>
        </Label>
        {comment_data.length === 0 ? (
          <section className="no-comment">
            <p>아직 댓글이 없어요</p>
            <p>가장 먼저 댓글을 남겨 보세요.</p>
          </section>
        ) : (
          comment_data &&
          comment_data.map((item, index) => (
            <section key={index} className="comment-section">
              <StUserBox>
                <UserImgBox>
                  <StProfileIcon />
                </UserImgBox>
                <UserInfoTxt>
                  <H3>{item.nickname}</H3>
                  {!isUpdateInput && <P>{item.content}</P>}
                  {isUpdateInput && (
                    <>
                      <UpdateWrapper>
                        <UpdateInput
                          name="updateInput"
                          value={updateInput}
                          onChange={onUpdateChangeHandler}
                        />
                        <UpdateButtonsWrapper>
                          <button
                            onClick={() => {
                              onUpdateHandler(item.commentId);
                            }}
                          >
                            수정
                          </button>
                          <button onClick={() => setIsUpdateInput(false)}>
                            취소
                          </button>
                        </UpdateButtonsWrapper>
                      </UpdateWrapper>
                    </>
                  )}
                </UserInfoTxt>
              </StUserBox>
              <ButtonsWrapper>
                {!isUpdateInput && nickname === item.nickname && (
                  <>
                    <button
                      content={"수정"}
                      onClick={() => {
                        setIsUpdateInput(true);
                        setUpdateInput(item.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          deleteCommentData({
                            itemId: id,
                            commentId: item.commentId,
                          })
                        );
                      }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </ButtonsWrapper>
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
  padding-bottom: 8rem;
  margin: 0 auto;
  .comment-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 36rem;
    padding: 1.4rem 1.8rem;
    gap: 1rem;

    button {
      cursor: pointer;
    }

    button:hover {
      background: #f0f0f0;
    }
    @media (max-width: 767px) {
      /* Mobile */
      padding: 0.5rem 2.2rem;
      width: 25rem;
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
  padding: 0.5rem;
  outline: none;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-top: 3.4rem;
    padding: 0.8rem;
    font-size: 1.1rem;
    width: 21rem;
    height: 3rem;
  }
`;

const Label = styled.label`
  position: relative;
  margin-bottom: 5rem;
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 4rem;
  }
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
    @media (max-width: 767px) {
      /* Mobile */
      top: 61%;
      right: 1%;
      width: 4rem;
      height: 2rem;
    }
  }

  button:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

const StUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  column-gap: 1.2rem;
  row-gap: 1.2rem;
  margin-bottom: 3rem;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    display: flex;
    align-content: center;
    justify-content: center;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    display: flex;
    align-content: center;
    justify-content: center;
  }
  @media (max-width: 767px) {
    /* Mobile */
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;

const UserImgBox = styled.div`
  border-radius: 70%;
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const StProfileIcon = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  path {
    fill: white;
    background-color: #6b6b6b;
  }
  circle {
    fill: #6b6b6b;
  }
`;

const UserInfoTxt = styled.div`
  margin-top: -0.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
`;

const P = styled.p`
  font-size: 1.2rem;
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1rem;
  }
`;

const H3 = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.2rem;
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: -5rem;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;

  button {
    border: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.darkgray};
    @media (max-width: 767px) {
      /* Mobile */
      font-size: 0.8rem;
    }
  }
`;

const UpdateInput = styled.input`
  width: 22rem;
  height: 2rem;
  border: 0.1rem solid #cbcbcb;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding: 0.5rem;
  outline: none;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  @media (max-width: 767px) {
    /* Mobile */
    padding: 0.8rem;
    font-size: 1.1rem;
    width: 12rem;
    height: 1.5rem;
  }
`;

const UpdateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`;

const UpdateButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.2rem;
  button {
    border: none;
    background: #cbcbcb;
    border-radius: 0.3rem;
    font-size: 1rem;
    width: 3rem;
    height: 2rem;
    color: white;
    @media (max-width: 767px) {
      /* Mobile */
      font-size: 0.6rem;
      width: 2.2rem;
      height: 1.7rem;
    }
  }
`;
