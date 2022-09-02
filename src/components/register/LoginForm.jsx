import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/modules/user/userActions';
import KakaoLogin from './socialLogin/KakaoLogin';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // react-hook-form
  // 실시간 유효성 검사
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = () => {
    const body = {
      email: watch().userId,
      password: watch().password,
    };

    dispatch(userLogin(body));
  };

  const onError = (error) => {
    console.log(error);
  };

  const goHome = () => {
    navigate('/');
  };

  // window.location.href

  return (
    <>
      <STwrap className='wrap'>
        <section>
          <p className='go-back' onClick={goHome}>
            홈 아이콘
          </p>
          <section className='login-context'>
            <h2 className='title'>로그인</h2>
          </section>
        </section>
        <form className='login-form' onSubmit={handleSubmit(onSubmit, onError)}>
          <div className='field'>
            <Label className='label'>
              아이디
              <div>
                <input
                  type='text'
                  tabIndex='2'
                  className='input'
                  {...register('userId', {
                    required: '아이디는 필수값입니다.',
                  })}
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? 'true' : 'false'
                  }
                  name='userId'
                />
              </div>
              {errors.userId && (
                <p className='error'>{errors?.userId?.message}</p>
              )}
            </Label>
          </div>
          <div className='field'>
            <label className='label'>
              비밀번호
              <div>
                <input
                  type='password'
                  tabIndex='2'
                  className='input'
                  {...register('password', {
                    required: '비밀번호는 필수값입니다.',
                  })}
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? 'true' : 'false'
                  }
                  name='password'
                />
              </div>
              {errors.password && (
                <p className='error'>{errors?.password?.message}</p>
              )}
            </label>
          </div>
          <button className='login-btn'>로그인</button>
        </form>
        <div>
          <KakaoLogin className='login-btn' />
        </div>
        <div className='move-signup'>
          <p className='isnot-member'>아직 회원이 아니신가요?</p>
          <p
            className='go-signup'
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </p>
        </div>
      </STwrap>
    </>
  );
};

export default LoginForm;

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

  .login-context {
    margin-top: 2rem;
    margin-left: 1rem;
    .title {
      font-size: 2.8rem;
      line-height: 4.1rem;
      font-weight: 700;
    }
  }

  .login-btn {
    margin-top: 3.5rem;
    width: 30rem;
    border: 2px solid #cbcbcb;
    border-radius: 6px;
    height: 3.5rem;
  }

  .login-btn:hover {
    cursor: pointer;
  }

  .login-form {
    margin-top: 3rem;
  }

  .field {
    margin-top: 1rem;
  }

  .input {
    border: 2px solid #cbcbcb;
    border-radius: 6px;
    width: 30rem;
    height: 4rem;
    font-size: 1.8rem;
  }

  .error {
    color: red;
  }

  .move-signup {
    display: flex;
    margin-top: 6rem;
    justify-content: center;
    align-items: center;
    .isnot-member {
      width: 22.5rem;
      height: 2.3rem;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.3rem;
      color: #6b6b6b;
    }
    .go-signup {
      width: 6.8rem;
      height: 2.3rem;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.3rem;
      text-decoration-line: underline;
      color: #6b6b6b;
    }
    .go-signup:hover {
      cursor: pointer;
    }
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
    height: 4rem;
  }

  button:hover {
    cursor: pointer;
  }
`;
