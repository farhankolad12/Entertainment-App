import React from "react";
import { useItems } from "../contexts/ItemContext";
import Trending from "./Trending";
import Recommand from "./Recommand";

const MainContainer = () => {
  const { trendingItems, recommandItems } = useItems();

  return (
    <div className="main">
      <div className="trending-container">
        <h3 style={{ fontWeight: "lighter", fontSize: "2rem" }}>Trending</h3>
        <div className="trending-items">
          {trendingItems.map((item) => (
            <Trending item={item} key={item.title} />
          ))}
        </div>
      </div>
      <div className="recommand-container">
        <h3 style={{ fontWeight: "lighter", fontSize: "2rem" }}>
          Recommanded for you
        </h3>
        <div className="recommand-items">
          {recommandItems.map((item) => (
            <Recommand item={item} key={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
