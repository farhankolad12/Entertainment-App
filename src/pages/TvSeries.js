import React from "react";
import { useItems } from "../contexts/ItemContext";
import Recommand from "../components/Recommand";
import Form from "../components/Form";

const TvSeries = () => {
  const { tvItems } = useItems();

  return (
    <main>
      <Form link={"tv"} />
      <div className="recommand-items">
        {tvItems.map((item) => (
          <Recommand item={item} key={item.title} />
        ))}
      </div>
    </main>
  );
};

export default TvSeries;
