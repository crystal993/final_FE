import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/modules/user/userActions";
import Button from "../elements/GlobalButton";
import KakaoLogin from "./socialLogin/KakaoLogin";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.user.userToken);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm({ mode: "onChange" });

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

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <TitleWrapper>
            <Title>로그인</Title>
          </TitleWrapper>
          <Container>
            <Label> 아이디</Label>
            <InputWrapper>
              <Input
                type="text"
                tabIndex="2"
                className="input"
                {...register("userId", {
                  required: "가입한 이메일을 적어주세요.",
                })}
                aria-invalid={
                  !isDirty ? undefined : errors.userId ? "true" : "false"
                }
                name="userId"
              />
              {errors.userId && (
                <HelperText>{errors?.userId?.message}</HelperText>
              )}
              {!errors.userId && (
                <HelperText>{"가입한 이메일을 적어주세요."}</HelperText>
              )}
            </InputWrapper>

            <Label>비밀번호</Label>
            <InputWrapper>
              <Input
                type="password"
                tabIndex="2"
                className="input"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
                aria-invalid={
                  !isDirty ? undefined : errors.password ? "true" : "false"
                }
                name="password"
              />
              {errors.password && (
                <HelperText>{errors?.password?.message}</HelperText>
              )}
              {!errors.password && (
                <HelperText>{"비밀번호를 입력해주세요."}</HelperText>
              )}
            </InputWrapper>
          </Container>
          <Button
            content={"로그인"}
            mobileWidth={"25rem"}
            width={"38rem"}
            fontSize={"1.8rem"}
            mobileFontSize={"1.3rem"}
            height={"5rem"}
            mobileHeight={"3.6rem"}
          />
        </Form>
        <ButtonsWrapper>
          <KakaoLogin />
        </ButtonsWrapper>
        <SignUpHelperTxt>아직 멍냥마켓 회원이 아니신가요?</SignUpHelperTxt>
        <SignUpLink
          onClick={() => {
            navigate("../signup");
          }}
        >
          회원가입
        </SignUpLink>
      </FormWrapper>
    </>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  padding-top: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 11.5rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 50rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 50rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 36rem;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1.6rem 0 3rem 0;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 4rem;
  }
`;

const Title = styled.h1`
  text-align: left;
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 2.4rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 2.4rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: max-content;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 5.5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 4rem;
  }
`;

const Label = styled.label`
  font-weight: 900;
  font-size: 1.4rem;
  margin: 0.5rem 0rem;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.darkgray};
`;

const InputWrapper = styled.div`
  position: relative;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 2rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 1.8rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 1.6rem;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 0;
  position: relative;
  display: inline-block;
  width: 28.7rem;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.4rem;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme.darkgray};
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 2px;
  transition: all 0.3s;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.mainColor};
    outline: none;
  }
  &[type="file"] {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    color: ${({ theme }) => theme.darkgray};
  }
  &[type="file"]::file-selector-button {
    margin-left: -10px;
    width: fit-content;
    font-size: small;
    text-align: center;
    padding: 10px 15px;
    border-radius: 20px;
    cursor: pointer;
    color: #ffffff;
    border-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.mainColor};
  }
  &[type="file"]::file-selector-button:hover {
    background-color: #dadae1;
  }
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (min-width: 1280px) {
    /* Desktop */
    width: 38rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 38rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 25rem;
  }
`;

const HelperText = styled.p`
  margin-top: 0.3rem;
  font-size: 1.2rem;
  color: #cbcbcb;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  margin-top: 0.5rem;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 13rem;
  }
`;

const SignUpHelperTxt = styled.h1`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 2.3rem;
  color: ${({ theme }) => theme.gray};
`;

const SignUpLink = styled.a`
  color: ${({ theme }) => theme.darkgray};
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 2.3rem;
  text-decoration-line: underline;
  cursor: pointer;
`;
