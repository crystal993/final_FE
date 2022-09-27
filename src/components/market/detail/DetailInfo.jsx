import React, { useEffect, useState } from "react";
import {
  __getSinglePost,
  __deletePost,
} from "../../../redux/modules/market/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemZzimButton from "../../elements/buttons/ItemZzimButton";
import ImgSlider from "../../elements/GlobalImgSlider2";
import Comment from "../comment/Comment";
import FixButton from "../../elements/buttons/FixButton";
import FixThreeButton from "../../elements/buttons/FixThreeButton";
import GlobalModal from "../../elements/GlobalModal";
import PriceChart from "../../elements/chart/PriceChart";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile_img_sm.svg";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share_icon.svg";
import EditIcon from "../../../assets/icons/edit_document2.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import CheckIcon from "../../../assets/icons/check_circle.svg";
import Accordian from "../../elements/GlobalAccordian";

const DetailInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const items = useSelector((state) => state.marketPost.singlePost);
  const [item, setItem] = useState(items);
  useEffect(() => {
    setItem(items);
  }, [setItem, items]);
  console.log(items);

  const isLogin = useSelector((state) => state.user.userToken);
  const itemImgs = item.itemImgs;

  useEffect(() => {
    localStorage.setItem("itemMemberId", item.memberId);
    localStorage.setItem("itemId", item.id);
    localStorage.setItem("itemNickname", item.nickname);
  }, []);

  const moveChat = () => {
    navigate(`/chatRoom/${id}`);
    console.log(id);
  };

  useEffect(() => {
    dispatch(__getSinglePost({ id: id }));
  }, []);

  useEffect(() => {
    dispatch(__getSinglePost({ id: id }));
  }, [dispatch, id]);

  const deleteHandler = (id) => {
    dispatch(__deletePost({ id: id }));
    navigate("/");
  };

  const URI = {
    KAKAO_JAVASCRIPT_KEY: process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY,
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  };

  const sharekakao = (event) => {
    event.preventDefault();
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(`${URI.KAKAO_JAVASCRIPT_KEY}`);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${item.title}`,
          description: `${item.content}`,
          imageUrl: `${item.itemImgs[0]}`,
          link: {
            mobileWebUrl: `${URI.REACT_APP_BASE_URL}`,
            webUrl: `${URI.REACT_APP_BASE_URL}`,
          },
        },
      });
    }
  };

  // 사용할 컴포넌트에서만 script를 호출하기 위해서
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onEditHandler = () => {
    navigate(`/market/post/${id}`, { state: item });
  };

  const [isModal, setModal] = useState(false);
  const [isMessage, setMessage] = useState(null);
  const onDeleteHandler = (event) => {
    event.stopPropagation();
    // TODO:  추후에 모달로 바꿀 예정
    // 모달 중에 예 아니요 선택하는 모달도 필요할 듯
    const result = window.confirm("게시글을 삭제하겠습니까?");
    if (result) {
      return deleteHandler(id);
    } else {
      return;
    }
  };
  return (
    <>
      <DetailInfoWrapper>
        {isModal ? (
          <GlobalModal content={"로그인 하세요"} name={"로그인"} />
        ) : null}
        <ImgSlider
          itemImgs={itemImgs}
          mobileWidth={"36rem"}
          tabletWidth={"50.6rem"}
          desktopWidth={"50.6rem"}
          mobileHeight={"22.2rem"}
          tabletHeight={"31.2rem"}
          desktopHeight={"31.2rem"}
        />
        <DetailWrapper>
          <InfoWrapper>
            <P>
              {item.itemCategory} {item.time}
            </P>
          </InfoWrapper>
          <Title>{item.title}</Title>
          <StWrapper>
            <Price>{item.sellingPrice?.toLocaleString("ko-KR")}원</Price>
            <StShareIcon onClick={sharekakao} />
          </StWrapper>
          <StUserBox>
            <UserImgBox>
              <StProfileIcon />
            </UserImgBox>
            <UserInfoTxt>
              <H3>{item.nickname}</H3>
              <P>{item.location}</P>
            </UserInfoTxt>
          </StUserBox>
          <Content>{item.content}</Content>
          <InfoCntWrapper>
            <P>
              관심 {item.zzimCnt} 조회수 {item.viewCnt}
            </P>
          </InfoCntWrapper>
          <ItemZzimButton
            postId={id}
            isLogin={isLogin}
            isZzim={item.isZzimed}
          />
          <Accordian
            btnTxt={"가격 비교하기"}
            contents={
              <PriceChart
                purchasePrice={item.purchasePrice}
                sellingPrice={item.sellingPrice}
                averagePrice={item.averagePrice}
              />
            }
          />
          <Comment id={id} />
          {!item.isMine && (
            <FixButton content={"채팅으로 거래하기"}></FixButton>
          )}
          {item.isMine && (
            <FixThreeButton
              content1={"삭제하기"}
              content2={"거래완료"}
              content3={"수정하기"}
              onClick1={onDeleteHandler}
              onClick3={onEditHandler}
              icon1={DeleteIcon}
              icon2={CheckIcon}
              icon3={EditIcon}
            />
          )}
        </DetailWrapper>
      </DetailInfoWrapper>
    </>
  );
};

const DetailInfoWrapper = styled.div`
  padding-top: 4.9rem;
  margin: 0 auto;
  width: 50.6rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 26rem;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.darkgray};
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
    font-size: 1.4rem;
  }
`;

const StWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 2.5rem 0;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const Title = styled.p`
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 2.4rem;
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 2rem;
  }
`;

const Price = styled.p`
  color: ${({ theme }) => theme.mainColor};
  font-weight: bold;
  font-size: 2.8rem;
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 2.4rem;
  }
`;

const StUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  gap: 1.5rem;
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
  @media (min-width: 768px) {
    /* Tablet */ /* Desktop */
    width: 5rem;
    height: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 4rem;
    height: 4rem;
  }
`;

const StShareIcon = styled(ShareIcon)`
  cursor: pointer;
  path {
    fill: ${({ theme }) => theme.darkgray};
  }
  @media (min-width: 768px) {
    /* Tablet */ /* Desktop */
    width: 1.8rem;
    height: 2rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const UserInfoTxt = styled.div``;

const Content = styled.h1`
  font-weight: 400;
  @media (min-width: 768px) {
    /* Tablet */ /* Desktop */
    font-size: 1.6rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.4rem;
  }
`;

const InfoCntWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.darkgray};
  margin: 3.2rem 0 3.4rem 0;
`;

const StProfileIcon = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default DetailInfo;
