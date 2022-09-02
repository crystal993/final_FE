import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketMain from "../page/market/Main";
import MarketDetail from "../page/market/Detail";
import MarketPosting from "../page/market/Posting";
import MarketPostingUpdate from "../page/market/PostingUpdate";
import Login from "../page/register/Login";
import Signup from "../page/register/Signup";
import Search from "../page/Search";
import Chatting from "../page/chatting/Chatting";
import NotFound from "../page/NotFound";
import MyPage from "../page/MyPage";
import Kakao from "../components/register/socialLogin/Kakao";

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
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
