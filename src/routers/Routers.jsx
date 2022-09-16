
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketMain from "../page/market/Main";
import MarketDetail from "../page/market/Detail";
import MarketPosting from "../page/market/Posting";
import MarketPostingUpdate from "../page/market/PostingUpdate";
import Login from "../page/register/Login";
import Signup from "../page/register/Signup";
import Search from "../page/search/Search";
import ChatRoomPage from '../page/chatting/ChatRoomPage';
import ChatListPage from '../page/chatting/ChatListPage';
import NotFound from "../page/NotFound";
import MyPage from "../page/myPage/MyPage";
import Kakao from "../components/register/socialLogin/Kakao";
import SearchResult from "../page/search/SearchResult";
import MyZzim from "../page/myPage/MyZzim";
import MyWritings from "../page/myPage/MyWritings";
import MyViewedProucts from "../page/myPage/MyViewedProucts";


const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketMain />} />
        <Route path="/market" element={<MarketMain />} />
        <Route path="/market/detail/:id" element={<MarketDetail />} />
        <Route path="/market/post" element={<MarketPosting />} />
        <Route path="/market/post/:id" element={<MarketPostingUpdate />} />
        <Route path="/kakao" element={<Kakao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/result/:keyword" element={<SearchResult />} />
        <Route path='/chatroom/:itemId/:memberId' element={<ChatRoomPage />} />
        <Route path='/chatlist/:roomId' element={<ChatListPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/zzims" element={<MyZzim />} />
        <Route path="/mypage/writings" element={<MyWritings />} />
        <Route path="/mypage/products" element={<MyViewedProucts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
