import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow_back_ios.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { __itemSearch } from "../../redux/modules/searchSlice";
import { debounce } from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { apis } from "../../shared/axios";
import InputResetButton from "../elements/buttons/InputResetButton";

const SearchHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleState = useSelector((state) => state.search.toggle);
  const { keyword } = useParams();

  const [keywordValue, setKeywordValue] = useState(keyword);
  const [autoSearchKeywords, setAutoSearchKeywords] = useState([]);

  const searchInput = useRef();
  const [autoComplete, setAutoComplete] = useState(false);

  // input의 외부 영역을 눌렀을 때
  // 자동완성 영역이 꺼질 수 있도록
  useEffect(() => {
    const listener = (event) => {
      if (searchInput.current && !searchInput.current.contains(event.target)) {
        setAutoComplete(false);
      } else {
        setAutoComplete(true);
      }
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [searchInput]);

  // 검색 기능
  const onSearchResultHandler = () => {
    dispatch(__itemSearch({ keyword: keywordValue, toggleState: toggleState }));
    navigate(`/search/result/${keywordValue}`);
    setAutoComplete(false);
  };

  // 자동 완성 기능
  const onAutoCompleteHandler = ({ target }) => {
    const keyword = target.value;
    debounceApiCall(keyword);
  };

  const debounceApiCall = useCallback(
    debounce((keyword) => {
      apis.get_auto_complete(keyword).then(({ data }) => {
        setAutoSearchKeywords(data);
      });
    }, 350),
    []
  );

  // enter 눌렀을 때 검색 기능
  const onCheckEnterHandler = (e) => {
    if (e.key === "Enter") {
      onSearchResultHandler();
    }
  };

  //자동완성 키워드로 검색
  const onAutoCompleteSearchResultHandler = (keyword) => {
    dispatch(__itemSearch({ keyword: keyword, toggleState: toggleState }));
    navigate(`/search/result/${keyword}`);
  };

  const inputResetHandler = () => {
    document.getElementById("keyword").value = ""; //검색 페이지의 input값 reset
    setKeywordValue(""); //KeywordValue값 리셋
    setAutoComplete(false);
  };
  return (
    <SearchWrapper>
      <Navbar>
        <StForm onKeyPress={onCheckEnterHandler}>
          <NavItem>
            <StArrowBackIcon onClick={() => navigate("/")} />
          </NavItem>
          <NavItem ref={searchInput}>
            {keyword !== undefined ? (
              <InputWrapper>
                <SearchInput
                  id="keyword"
                  placeholder="검색어를 입력해주세요."
                  type="text"
                  name="keyword"
                  value={keywordValue}
                  required
                  onChange={(e) => {
                    setKeywordValue(e.target.value);
                    onAutoCompleteHandler(e);
                    setAutoComplete(true);
                  }}
                  ref={searchInput}
                />
                <InputResetButton onClick={() => inputResetHandler()} />
              </InputWrapper>
            ) : (
              <InputWrapper>
                <SearchInput
                  id="keyword"
                  placeholder="검색어를 입력해주세요."
                  type="text"
                  name="keyword"
                  required
                  onChange={(e) => {
                    setKeywordValue(e.target.value);
                    onAutoCompleteHandler(e);
                    setAutoComplete(true);
                  }}
                />
                <InputResetButton onClick={() => inputResetHandler()} />
              </InputWrapper>
            )}
            {autoComplete && (
              <AutoSearchContainer>
                {autoSearchKeywords?.map((keyword, idx) => {
                  if (idx < 10) {
                    return (
                      <AutoSearchKeyword
                        key={uuidv4()}
                        onClick={() =>
                          onAutoCompleteSearchResultHandler(keyword.searchWord)
                        }
                      >
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
    </SearchWrapper>
  );
};

export default SearchHeader;

const SearchWrapper = styled.div`
  position: fixed;
  flex-direction: column;
  width: 100%;
  z-index: 100;
`;

const StArrowBackIcon = styled(ArrowBackIcon)``;

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.headerMainColor};
  color: ${({ theme }) => theme.headerTxtColor};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  @media (min-width: 1280px) {
    /* Desktop */
    padding: 1rem 0rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    padding: 1rem 0rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    padding: 1rem 0rem;
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  position: relative;
  background-color: ${({ theme }) => theme.headerMainColor};
`;

const InputWrapper = styled.div``;

const StForm = styled.form`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
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
  @media (min-width: 1280px) {
    /* Desktop */
    width: 44rem;
    height: 3rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 44rem;
    height: 3rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 20rem;
    height: 3rem;
  }
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
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (min-width: 1280px) {
      /* Desktop */
      font-size: 1.8rem;
      line-height: 2.9rem;
    }
    @media (min-width: 768px) and (max-width: 1280px) {
      /* Tablet */
      font-size: 1.8rem;
      line-height: 2.9rem;
    }
    @media (max-width: 767px) {
      /* Mobile */
      font-size: 1.5rem;
      line-height: 2.3rem;
    }
  }
`;

const AutoSearchContainer = styled.div`
  z-index: 100;
  margin-top: 16rem;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  height: 28rem;
  border-radius: 0.4rem;
  width: 27rem;
  border: 1px solid ${({ theme }) => theme.mainColor};
  cursor: default;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 44rem;
    height: 27rem;
    top: -13rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 44rem;
    height: 27rem;
    top: -13rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 20rem;
    height: 27rem;
    top: -13rem;
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
