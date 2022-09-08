import React, { useEffect, useState } from "react";
import {
  __getSinglePost,
  __deletePost,
} from "../../../redux/modules/market/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemZzimButton from "../../elements/buttons/ItemZzimButton";
import SimpleSlider from "./SimpleSlider";
import Comment from "../comment/Comment";
import FixButton from "../../elements/buttons/FixButton";
import FixThreeButton from "../../elements/buttons/FixThreeButton";
import PriceChart from "../../elements/chart/PriceChart";
import GlobalModal from "../../elements/GlobalModal";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile_img_sm.svg";
import EditIcon from "../../../assets/icons/edit_document2.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import CheckIcon from "../../../assets/icons/check_circle.svg";

const DetailInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.marketPost.singlePost);
  const isLogin = useSelector((state) => state.user.userToken);
  const itemImgs = item.itemImgs;
  console.log(item);

  useEffect(() => {
    dispatch(__getSinglePost({ id: id }));
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(__deletePost({ id: id }));
    navigate("/");
  };

  const sharekakao = (event) => {
    event.preventDefault();
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("a729d68f8474b39d110cdd9e7a162f5a");
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${item.title}`,
          description: `${item.content}`,
          imageUrl: `${item.itemImgs[0]}`,
          link: {
            // 배포한 주소
            mobileWebUrl: "공유할 url 주소",
            webUrl: "공유할 url주소",
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
      {isModal ? <GlobalModal content={isMessage} /> : null}
      <SimpleSlider itemImgs={itemImgs} />
      <DetailWrapper>
        <InfoWrapper>
          <P>
            {item.itemCategory} {item.time}
          </P>
        </InfoWrapper>
        <Title>{item.title}</Title>
        <StWrapper>
          <Price>{item.sellingPrice?.toLocaleString("ko-KR")}</Price>
          <StIcon>
            <span class="material-icons" onClick={sharekakao}>
              share
            </span>
          </StIcon>
        </StWrapper>
        <PriceChart
          purchasePrice={item.purchasePrice}
          sellingPrice={item.sellingPrice}
        />
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
        <ItemZzimButton postId={id} isLogin={isLogin} isZzim={item.isZzimed} />
        <Comment id={id} />
        {!item.isMine && <FixButton content={"채팅으로 거래하기"}></FixButton>}
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
    </>
  );
};

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
  font-size: 1rem;
`;

const H3 = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
`;

const StWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 2.8rem 0;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.darkgray};
  }
`;

const StIcon = styled.div`
  @media (min-width: 1024px) {
    margin: 0 1.3rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 0 1.3rem;
  }
  @media (max-width: 767px) {
    margin: 0 1.3rem;
  }
`;

const Title = styled.p`
  font-size: 2rem;
`;

const Price = styled.p`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.mainColor};
  font-weight: bold;
`;

const StUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  gap: 1.5rem;
  margin: 3rem 0;
  .user-info {
    justify-content: flex-start;
    background-color: green;
  }
  .share {
    justify-content: flex-end;
    background-color: red;
  }
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
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 50px;
    height: 50px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 50px;
    height: 50px;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 50px;
    height: 50px;
  }
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfoTxt = styled.div``;

const Content = styled.h1`
  font-weight: 400;
  font-size: 1.4rem;
`;

const InfoCntWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.darkgray};
  margin: 3.2rem 0;
`;

const StProfileIcon = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default DetailInfo;
