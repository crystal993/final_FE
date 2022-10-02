import React from "react";
import Layout from "./../../components/elements/GlobalLayout";
import LoginForm from "../../components/register/LoginForm";
import Header from "../../components/elements/GlobalHeader2";

const Login = () => {
  return (
    <>
      <Header />
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
};

export default Login;
