import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow_back_ios.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { __itemSearch } from "../../redux/modules/searchSlice";
import { debounce } from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const SearchHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleState = useSelector((state) => state.search.toggle);

  const [keywordValue, setKeywordValue] = useState();
  const [autoSearchKeywords, setAutoSearchKeywords] = useState([]);
  // 검색 기능
  const onSearchResultHandler = () => {
    dispatch(__itemSearch({ keyword: keywordValue, toggleState: toggleState }));
    navigate(`/search/result/${keywordValue}`);
  };

  // 자동 완성 기능
  const onAutoCompleteHandler = ({ target }) => {
    const keyword = target.value;
    debounceApiCall(keyword);
  };

  const debounceApiCall = useCallback(
    debounce((keyword) => {
      axios
        .get(`http://43.200.1.214/items/search/auto?keyword=${keyword}`)
        .then(({ data }) => {
          setAutoSearchKeywords(data);
        });
      console.log("api call!");
    }, 350),
    []
  );

  // enter 눌렀을 때 검색 기능
  const onCheckEnterHandler = (e) => {
    if (e.key === "Enter") {
      onSearchResultHandler();
    }
  };

  return (
    <SearchWrapper>
      <NavbarWrapper>
        <Navbar>
          <NavItem>
            <ArrowBackIcon onClick={() => navigate(-1)} />
          </NavItem>
          <StForm onKeyPress={onCheckEnterHandler}>
            <NavItem>
              <SearchInput
                id="keyword"
                placeholder="검색어를 입력해주세요."
                type="text"
                name="keyword"
                required
                onChange={(e) => {
                  setKeywordValue(e.target.value);
                  onAutoCompleteHandler(e);
                }}
              />
              {keywordValue && (
                <AutoSearchContainer>
                  {autoSearchKeywords?.map((keyword, idx) => {
                    if (idx < 10) {
                      return (
                        <AutoSearchKeyword key={uuidv4()}>
                          {keyword.searchWord}
                        </AutoSearchKeyword>
                      );
                    }
                  })}
                </AutoSearchContainer>
              )}
            </NavItem>
            <NavItem>
              <SearchButton>
                <SearchIcon onClick={() => onSearchResultHandler()} />
              </SearchButton>
            </NavItem>
          </StForm>
        </Navbar>
      </NavbarWrapper>
    </SearchWrapper>
  );
};

export default SearchHeader;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NavbarWrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.mainColor};
  color: white;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  gap: 2rem;
  cursor: pointer;
  width: fit-content;
`;

const SearchInput = styled.input`
  width: 27rem;
  height: 3rem;
  border: none;
  border-radius: 0.4rem;
  color: rgba(0, 0, 0, 0.85);
  padding: 0.4rem 1.1rem;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.3rem;
  position: relative;
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.mainColor};
    outline: none;
  }
  &::placeholder {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.gray};
  }
  @media (min-width: 1024px) {
    width: 40rem;
    margin-left: -2rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 30rem;
    margin-left: -2rem;
  }
  @media (max-width: 767px) {
    width: 25rem;
    margin-left: -2rem;
  }
  @media (max-width: 500px) {
    width: 20rem;
    margin-left: -1.3rem;
  }
`;

const StForm = styled.form`
  width: 73%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.mainColor};
`;

const AutoSearchContainer = styled.div`
  padding-top: 0.5rem;
  position: absolute;
  z-index: 5;
  top: 3.8rem;
  background-color: ${({ theme }) => theme.white};
  height: 28rem;
  width: 100%;
  border-radius: 0.4rem;
  border: 1px solid ${({ theme }) => theme.mainColor};
  cursor: default;
  @media (min-width: 1024px) {
    width: 40rem;
    margin-left: -2rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 30rem;
    margin-left: -2rem;
    left: 19.5rem;
    top: 3.8rem;
  }
  @media (max-width: 767px) {
    width: 25rem;
    margin-left: -2rem;
    left: 17rem;
  }
  @media (max-width: 600px) {
    width: 25rem;
    margin-left: -1.3rem;
    left: 10.8rem;
  }
  @media (max-width: 500px) {
    width: 20rem;
    margin-left: -1.3rem;
    left: 11.5rem;
  }
`;

const AutoSearchKeyword = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 0.3rem 1rem;
  color: ${({ theme }) => theme.mainColor};
  cursor: pointer;
`;
