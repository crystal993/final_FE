import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { __addPost } from "../../../redux/modules/market/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/GlobalButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ImgView from "../../elements/ImgView";
import RESP from "../../../server/response";
import axios from "axios";
import { IoIosLocate } from "react-icons/io";

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleClick = (e) => {
    let myInput = document.getElementById("fileInput");
    myInput.click();
  };

  const onSubmitHandler = (formData, e) => {
    console.log(formData);
    const files = formData.files;
    const data = {
      itemCategory: formData.itemCategory,
      petCategory: formData.petCategory,
      title: formData.title,
      content: formData.content,
      location: formData.location,
      purchasePrice: formData.purchasePrice,
      sellingPrice: formData.sellingPrice,
    };
    dispatch(__addPost({ data, files }));
    reset();
    navigate(`/`);
  };

  //다중 이미지 preview
  const [isLoading, setIsLoading] = useState(true);
  const [itemImgs, setItemImgs] = useState([]);

  const changeImg = async (e) => {
    setIsLoading(true);

    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    setItemImgs([...urlList]);
    console.log(itemImgs);
    if (files.length !== 0) {
      setIsLoading(false);
    }
  };

  const URI = {
    KAKAO_REST_API: process.env.REACT_APP_KAKAO_REST_API,
  };

  //현재 위치 api
  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude; //위도
          const lon = position.coords.longitude; //경도
          //kakao REST API에 get 요청을 보낸다.
          //파라미터 x,y에 lon,lat을 넣어주고 API_KEY를 Authorization헤더에 넣어준다.
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
              {
                headers: {
                  Authorization: `KakaoAK ${"91547d16c147d3035a5b8ea1bf701e74"}`,
                },
              }
            )
            .then((res) => {
              setValue(
                "location",
                res.data.documents[0].address.region_1depth_name +
                  " " +
                  res.data.documents[0].address.region_2depth_name
              );
            })
            .catch((e) => console.log(e));
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  getLocation(); //호출

  return (
    <>
      <FormWrapper>
        <TitleWrapper>
          <Title>게시글 작성</Title>
        </TitleWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Container>
            <SelectWrapper>
              <Select name="petCategory" {...register("petCategory")}>
                <Option value="">동물 종류</Option>
                <Option value="강아지">강아지</Option>
                <Option value="고양이">고양이</Option>
              </Select>

              <Select name="itemCategory" {...register("itemCategory")}>
                <Option value="">카테고리</Option>
                <Option value="사료">사료</Option>
                <Option value="간식">간식</Option>
                <Option value="의류">의류</Option>
                <Option value="미용">미용</Option>
                <Option value="장난감">장난감</Option>
                <Option value="기타용품">기타용품</Option>
              </Select>
            </SelectWrapper>

            <Label>제목</Label>

            <InputWrapper>
              <Input type="text" name="title" required {...register("title")} />
            </InputWrapper>

            <Label>구매 가격</Label>

            <InputWrapper>
              <Input
                type="text"
                name="purchasePrice"
                required
                {...register("purchasePrice")}
              />
              <HelperText>
                구매했을 당시 해당 물품의 가격을 적어주세요.
              </HelperText>
            </InputWrapper>
            <Label>판매 가격</Label>

            <InputWrapper>
              <Input
                type="text"
                name="sellingPrice"
                required
                {...register("sellingPrice")}
              />
              <HelperText>물품을 판매할 가격을 적어주세요.</HelperText>
            </InputWrapper>
            <Label>내용</Label>

            <TextArea
              type="textarea"
              textAlign="top"
              placeholder={"제품에 대한 설명을 입력해 주세요."}
              name="content"
              {...register("content")}
            />

            {/* location */}
            <LocationWrapper>
              <IoIosLocate />
              <LocationInput {...register("location")} readOnly></LocationInput>
            </LocationWrapper>

            <Input
              {...register("files")}
              id="files"
              accept="image/*"
              placeholder="이미지 파일"
              type="file"
              multiple
              onChange={changeImg}
              // style={{ display: "none" }}
            />
            <ImgWrapper>
              {!isLoading && <ImgView imgUrls={itemImgs} />}
            </ImgWrapper>
            <ButtonWrapper>
              <Button content={"등록"} size={"small"} />
            </ButtonWrapper>
          </Container>
        </Form>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  border: 1px solid #eee;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;

const Form = styled.form`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1.6rem 0 0 0;
  font-size: 1.3rem;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 40rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 35rem;
  }

  @media (max-width: 767px) {
    /* Mobile */

    width: 32.8rem;
  }
`;

const Title = styled.h1`
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
  margin: 0.5rem 0.5rem;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.darkgray};
`;

const InputWrapper = styled.div`
  margin-bottom: 4.7rem;
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
  border: 1px solid #d9d9d9;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 3;
  transition: all 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  }
  &:focus {
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

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 40rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 35rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 32.8rem;
  }
`;

const HelperText = styled.p`
  margin-top: 0.3rem;
  font-size: 1.2rem;
  color: #cbcbcb;
`;

const SelectWrapper = styled.div`
  margin-bottom: 3.5rem;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 40rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 35rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 32.8rem;
  }
`;

const Select = styled.select`
  box-sizing: border-box;
  margin: 5px;
  padding: 0;
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 0.4rem 1.1rem;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.4rem;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 0.4rem;
  transition: all 0.3s;
  font-size: 1.4rem;
  &:hover {
    border-color: #40a9ff;
    border-right-width: 1px;
  }
  &:focus {
    outline: none;
  }

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 18.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 16.5rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 15.5rem;
  }
`;

const Option = styled.option`
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.4rem;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  width: 32.8rem;
  height: 20rem;
  border: 1px solid #d5d0d0;
  background-color: ${({ theme }) => theme.whiteColor};
  margin: 15px 0px;
  border-radius: 4px;
  resize: none;
  font-size: 1.4rem;
  padding: 10px;
  text-indent: 5px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #eae0e0;
  }

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 38rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 35rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 32.8rem;
  }
`;

const LocationInput = styled.input`
  box-sizing: border-box;
  margin-bottom: 4.7rem;
  padding: 0;
  position: relative;
  display: inline-block;
  width: 10rem;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.4rem;
  color: #ffffff;
  border: 1px solid #d9d9d9;
  /* border-radius: 4px; */
  border: none;
  background-color: transparent;
`;

const ImgWrapper = styled.div``;

const LocationWrapper = styled.div`
  font-size: 1.4rem;
  height: 2.8rem;
  margin: 2rem 0 4rem 0;
  color: white;
  padding: 0.1rem 0.5rem;
  background-color: ${({ theme }) => theme.darkgray};
`;

export default Create;
