import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImgView = ({ imgUrls }) => {
  const [currImg, setCurrImg] = useState(0);
  const [lastImg, setLastImg] = useState(imgUrls.length - 1);

  const clickPrev = () => {
    setCurrImg((prev) => (prev - 1 < 0 ? lastImg : prev - 1));
  };

  const clickNext = () => {
    setCurrImg((prev) => (prev + 1 > lastImg ? 0 : prev + 1));
  };

  return (
    <>
      <ImgWrapper>
        <Button type="button" onClick={clickPrev}>
          <IoIosArrowBack />
        </Button>
        <ImgPreview src={imgUrls[currImg]} alt="img" width="300px" />

        <Button type="button" onClick={clickNext}>
          <IoIosArrowForward />
        </Button>
      </ImgWrapper>
      <RoundButtonWrapper>
        {imgUrls.map((_, i) => (
          <RoundButton key={i} onClick={() => setCurrImg(i)}></RoundButton>
        ))}
      </RoundButtonWrapper>
    </>
  );
};

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 3ms ease;
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

const Button = styled.button`
  background: transparent;
  border: none;
  margin: 1rem;
  font-size: 2rem;
  cursor: pointer;
  color: #000000;
  transition: all 3ms ease;
  &:hover {
    color: ${({ theme }) => theme.darkgray};
  }
`;

const RoundButton = styled.button`
  width: 1rem;
  height: 0.2rem;
  border: none;
  background-color: #000000;
  margin: 1rem 0.5rem;
`;

const RoundButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const ImgPreview = styled.img`
  width: 20rem;
  height: 20rem;
  background: cover;
  transition: all 3ms ease;
`;

export default ImgView;
