import React from "react";
import { useItems } from "../contexts/ItemContext";

const Trending = ({ item }) => {
  const { bookmarkedItem } = useItems();

  return (
    <div className="trending-item">
      <button className="bookmark" onClick={() => bookmarkedItem(item.id)}>
        <i className={` bi bi-bookmark${item.isBookmarked ? "-fill" : ""}`} />
      </button>
      <img
        src={
          item.thumbnail.trending
            ? item.thumbnail.trending.small
            : item.thumbnail.regular.small
        }
        alt="Trending"
      />
      <div className="trending-details">
        <span style={{ color: "#5A698F", fontWeight: "lighter" }}>
          {item.year} &bull; &nbsp;
          {item.category === "Movie" ? (
            <i className="bi bi-film" />
          ) : (
            <i className="bi bi-tv-fill" />
          )}
          &nbsp; &bull; {item.rating}
        </span>
        <h3 style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
          {item.title}
        </h3>
      </div>
    </div>
  );
};

export default Trending;
