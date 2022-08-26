import React, { useEffect } from "react";
import Form from "../components/Form";
import MainContainer from "../components/MainContainer";
import { useItems } from "../contexts/ItemContext";

const Home = () => {
  const { getFromStorage } = useItems();

  useEffect(() => {
    getFromStorage();
  }, []);

  return (
    <main>
      <Form link={"home"} />
      <MainContainer />
    </main>
  );
};

export default Home;
