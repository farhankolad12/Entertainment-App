import React from "react";
import { useItems } from "../contexts/ItemContext";
import Recommand from "../components/Recommand";
import Form from "../components/Form";

const MovieContainer = () => {
  const { movieItems } = useItems();

  return (
    <main>
      <Form link={"movie"} />
      <div className="recommand-items">
        {movieItems.map((item) => (
          <Recommand item={item} key={item.title} />
        ))}
      </div>
    </main>
  );
};

export default MovieContainer;
