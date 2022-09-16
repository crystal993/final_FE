import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  existMemberId,
  registerUser,
  existMemberNickname,
} from './../../redux/modules/user/userActions';
import GlobalModal from './../elements/GlobalModal';
import GlobalButton from '../elements/GlobalButton';
import InputResetButton from '../elements/buttons/InputResetButton';

const SignupForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // react-hook-form
  // 실시간 유효성 검사

  //아이디 중복확인 상태
  const [idDuplicate, onIdDuplicate] = useState(false);
  //닉네임 중복확인 상태
  const [nickDuplicate, onNickDuplicate] = useState(false);

  const idSuccess = useSelector((state) => state.user.idSuccess);
  const nickSuccess = useSelector((state) => state.user.nickSuccess);
  const registerSuccess = useSelector((state) => state.user.registerSuccess);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty, errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (event) => {
    if (watch().password !== watch().passwordConfirm) {
      alert('비밀번호를 확인하세요');
      return;
    }

    const body = {
      email: watch().userId,
      nickname: watch().nickname,
      password: watch().password,
      passwordConfirm: watch().passwordConfirm,
    };

    dispatch(registerUser(body));
  };

  const onReset = () => {
    setValue('userId', '');
  };

  const onDuplicateUserId = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(existMemberId({ email: watch().userId }));
  };

  const onDuplicateUserNickname = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(existMemberNickname({ nickname: watch().nickname }));
  };

  const onError = (error) => {
    console.log(error);
  };

  const goBack = () => {
    navigate('/');
  };

  if (registerSuccess) {
    navigate('/login');
  }

  return (
    <>
      {idSuccess === true ? null : (
        <GlobalModal content={`아이디 중복확인 하세요`} />
      )}
      {nickSuccess === true ? null : (
        <GlobalModal content={`닉네임 중복확인 하세요`} />
      )}
      <STwrap className='wrap'>
        <STsection>
          <p className='go-back' onClick={goBack}>
            뒤로가기
          </p>
          <section className='signup-context'>
            <h2 className='title'>회원가입</h2>
          </section>
        </STsection>
        <form
          className='signup-form'
          onSubmit={handleSubmit(onSubmit, onError, onDuplicateUserId)}
        >
          <div className='field'>
            <Label className='label'>
              이메일
              <div>
                <input
                  type='text'
                  tabIndex='2'
                  className='input'
                  {...register('userId', {
                    required: '이메일은 필수값입니다.',
                    pattern: {
                      value: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/,
                      message: '이메일 형식을 지켜주세요',
                    },
                  })}
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? 'true' : 'false'
                  }
                  name='userId'
                />
                {watch().userId === '' ? null : (
                  <InputResetButton className='input-reset' onClick={onReset} />
                )}
                <button className='idcheck-btn' onClick={onDuplicateUserId}>
                  중복체크
                </button>
              </div>
              {errors.userId && (
                <p className='error'>{errors?.userId?.message}</p>
              )}
            </Label>
          </div>
          <div className='field'>
            <Label className='label'>
              비밀번호
              <div>
                <input
                  type='password'
                  tabIndex='2'
                  className='input'
                  {...register('password', {
                    required: '비밀번호는 필수값입니다.',
                    pattern: {
                      value: /^[A-Za-z0-9]{6,12}$/,
                      message: '숫자,문자 포함 6~12자리',
                    },
                  })}
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? 'true' : 'false'
                  }
                  name='password'
                />
              </div>
              <span className='material-icons eye'>visibility</span>
              {errors.password && (
                <p className='error'>{errors?.password?.message}</p>
              )}
            </Label>
          </div>
          <div className='field'>
            <Label className='label'>
              비밀번호 확인
              <div>
                <input
                  type='password'
                  className='input'
                  tabIndex='2'
                  {...register('passwordConfirm', {
                    required: '비밀번호 확인은 필수값입니다.',
                    pattern: {
                      value: /^[A-Za-z0-9]{6,12}$/,
                      message: '숫자,문자 포함 6~12자리',
                    },
                  })}
                  aria-invalid={
                    !isDirty
                      ? undefined
                      : errors.passwordConfirm
                      ? 'true'
                      : 'false'
                  }
                  name='passwordConfirm'
                />
              </div>
              <span className='material-icons eye'>visibility</span>
              {errors.passwordConfirm && (
                <p className='error'>{errors?.passwordConfirm?.message}</p>
              )}
            </Label>
          </div>
          <div className='field'>
            <Label className='label'>
              닉네임
              <div>
                <input
                  type='text'
                  className='input'
                  tabIndex='2'
                  {...register('nickname', {
                    required: '닉네임은 필수 값입니다.',
                  })}
                  aria-invalid={
                    !isDirty ? undefined : errors.nickName ? 'true' : 'false'
                  }
                  name='nickname'
                />
              </div>
              {errors.nickname && (
                <p className='error'>{errors?.nickname?.message}</p>
              )}
              <button
                className='nickcheck-btn'
                onClick={onDuplicateUserNickname}
              >
                중복체크
              </button>
            </Label>
          </div>
          <div className='signup-button'>
            <GlobalButton
              content={'가입하기'}
              width={'30rem'}
              fontSize={'1.3rem'}
            ></GlobalButton>
          </div>
        </form>
      </STwrap>
    </>
  );
};
export default SignupForm;

const STsection = styled.section`
  .go-back {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.3rem;
    width: 6.8rem;
    height: 2.3rem;
  }

  .go-back:hover {
    cursor: pointer;
  }

  .title {
    width: 12.4rem;
    height: 4.1rem;
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 4.1rem;
    margin-left: 3.6rem;
  }
`;

const STwrap = styled.div`
  display: block;
  width: max-content;
  /* 페이지에서 정의 */
  margin: 0 auto;
  margin-top: 2rem;

  .label {
    width: 4.5rem;
    height: 2.3rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
  }

  .signup-context {
    margin-top: 2rem;
    margin-left: 1rem;
  }

  .signup-btn {
    margin-top: 3.5rem;
    width: 30rem;
    border: 2px solid #cbcbcb;
    border-radius: 6px;
    height: 5.6rem;
    background-color: ${({ theme }) => theme.mainColor};
    border: none;
    span {
      color: white;
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 2.9rem;
      text-align: center;
    }
  }

  .signup-button {
    margin-top: 2rem;
  }

  .signup-form {
    margin-top: 3rem;
  }

  .field {
    margin-top: 1rem;
  }

  .input {
    width: 30rem;
    height: 4rem;
    font-size: 1.8rem;
    border-right: 0px;
    border-top: 0px;
    border-left: 0px;

    &:active {
      border-color: ${({ theme }) => theme.mainColor};
    }
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.mainColor};
    }
  }

  .error {
    color: red;
  }
`;

const Label = styled.label`
  position: relative;

  button {
    position: absolute;
    top: 1;
    right: 0;
    border: 2px solid #cbcbcb;
    border-radius: 6px;
    height: 3rem;
  }

  button:hover {
    cursor: pointer;
  }

  .nickcheck-btn {
    position: absolute;
    top: 0;
    transform: translateY(55%);
    right: 0;
    border: 2px solid #cbcbcb;
    border-radius: 6px;
    height: 3rem;
  }

  .eye {
    position: absolute;
    top: 0;
    transform: translate(-15%, 55%);
    right: 0;
    display: flex;
    align-items: center;
    border-radius: 6px;
    height: 4rem;
  }

  span {
    transform: translate(-230%, 30%);
  }

  /* .cancel {
    position: absolute;
    transform: translateY(100%);
    display: flex;
    align-items: center;
    border-radius: 6px;
    height: 4rem;
  }

  .cancel:hover {
    cursor: pointer;
  }
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  } */
`;
