import React from "react";
import Header from "../../components/elements/GlobalHeader";
import Footer from "../../components/elements/GlobalFooter";
import ItemList from "../../components/market/ItemList";

const Main = () => {
  return (
    <>
      <Header />
      <ItemList />
      <Footer />
    </>
  );
};

export default Main;
