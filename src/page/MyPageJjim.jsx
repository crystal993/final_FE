import React from 'react';
import Layout from '../components/elements/GlobalLayout';
import Header from '../components/elements/GlobalHeader';
import MyPageJjimContainer from '../components/user/MyPageJjimContainer';

const MyPageJjim = () => {
  return (
    <Layout>
      <Header />
      <MyPageJjimContainer />
    </Layout>
  );
};

export default MyPageJjim;
