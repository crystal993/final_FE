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
  return (
    <SearchWrapper>
      <NavbarWrapper>
        <Navbar>
          <NavItem>
            <ArrowBackIcon onClick={() => navigate(-1)} />
          </NavItem>
          <StForm onKeyPress={onCheckEnterHandler}>
            <NavItem ref={searchInput}>
              {keyword !== undefined ? (
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
              ) : (
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
              )}
              {autoComplete && (
                <AutoSearchContainer>
                  {autoSearchKeywords?.map((keyword, idx) => {
                    if (idx < 10) {
                      return (
                        <AutoSearchKeyword
                          key={uuidv4()}
                          onClick={() =>
                            onAutoCompleteSearchResultHandler(
                              keyword.searchWord
                            )
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
      </NavbarWrapper>
    </SearchWrapper>
  );
};

export default SearchHeader;

const SearchWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 100;
`;
const NavbarWrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.headerMainColor};
  color: ${({ theme }) => theme.headerTxtColor};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 375px) and (max-width: 499px) {
    padding: 10px;
  }
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
  background-color: ${({ theme }) => theme.headerMainColor};
  @media (max-width: 375px) and (max-width: 499px) {
    gap: 1rem;
  }
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
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (min-width: 1024px) {
      font-size: 1.6rem;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) and (max-width: 767px) {
      font-size: 1.4rem;
    }
    @media (max-width: 375px) and (max-width: 499px) {
      font-size: 1.2rem;
    }
  }
  @media (min-width: 1024px) {
    width: 40rem;
    margin-left: -2rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 30rem;
    margin-left: -2rem;
  }
  @media (max-width: 500px) and (max-width: 767px) {
    width: 20rem;
    margin-left: -1.3rem;
  }
  @media (max-width: 375px) and (max-width: 499px) {
    width: 15rem;
    margin-left: -2rem;
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
  background-color: ${({ theme }) => theme.white};
`;

const AutoSearchContainer = styled.div`
  z-index: 100;
  margin-top: 16rem;
  position: absolute;
  top: -12.1rem;
  background-color: ${({ theme }) => theme.white};
  height: 28rem;
  border-radius: 0.4rem;
  width: 27rem;
  border: 1px solid ${({ theme }) => theme.mainColor};
  cursor: default;
  @media (min-width: 1024px) {
    width: 40rem;
    margin-left: -2rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 30rem;
    margin-left: -4.3rem;
    left: 19.5rem;
  }
  @media (max-width: 500px) and (max-width: 767px) {
    width: 20rem;
    margin-left: -1.3rem;
  }
  @media (max-width: 375px) and (max-width: 499px) {
    width: 15rem;
    margin-left: -2rem;
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
