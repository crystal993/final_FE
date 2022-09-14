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
  background: ${({ theme }) => theme.white};
  border-radius: 0.2rem;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 1rem -3.5rem;
  font-size: 3rem;
  cursor: pointer;
  transition: all 3ms ease;
  z-index: 10;
  color: ${({ theme }) => theme.darkgray};
`;

const RoundButton = styled.a`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  border: none;
  background-color: ${({ theme }) => theme.darkgray};
  margin: 2rem 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }
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
  width: 100%;
  height: 20rem;
  background: cover;
  transition: all 3ms ease;
`;

export default ImgView;
