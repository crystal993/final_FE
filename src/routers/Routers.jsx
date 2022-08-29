import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MarketMain from '../page/market/Main';
import MarketDetail from '../page/market/Detail';
import MarketPosting from '../page/market/Posting';
import MarketPostingUpdate from '../page/market/PostingUpdate';
import CommunityMain from '../page/community/Main';
import CommunityDetail from '../page/community/Detail';
import CommunityPosting from '../page/community/Posting';
import CommunityPostingUpdate from '../page/community/PostingUpdate';
import Login from '../page/register/Login';
import Signup from '../page/register/Signup';
import Search from '../page/Search';
import Chatting from '../page/chatting/Chatting';
import NotFound from '../page/NotFound';
import MyPage from '../page/MyPage';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MarketMain />} />
        <Route path='/market' element={<MarketMain />} />
        <Route path='/market/detail/:id' element={<MarketDetail />} />
        <Route path='/market/post' element={<MarketPosting />} />
        <Route path='/market/post/:id' element={<MarketPostingUpdate />} />
        <Route path='/community' element={<CommunityMain />} />
        <Route path='/community/detail/:id' element={<CommunityDetail />} />
        <Route path='/community/post' element={<CommunityPosting />} />
        <Route
          path='/community/post/:id'
          element={<CommunityPostingUpdate />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/search' element={<Search />} />
        <Route path='/chatting' element={<Chatting />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
