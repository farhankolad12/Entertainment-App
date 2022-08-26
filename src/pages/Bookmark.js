import React from "react";
import Form from "../components/Form";
import Recommand from "../components/Recommand";
import { useItems } from "../contexts/ItemContext";

const Bookmark = () => {
  const { allData } = useItems();

  return (
    <main>
      <Form link={"bookmark"} />
      <div className="movies-bookmark" style={{ marginTop: "2rem" }}>
        <h1 style={{ fontWeight: "lighter" }}>Bookmarked Movies</h1>
        <div className="recommand-items" style={{ marginTop: "0" }}>
          {allData.map((item) =>
            item.isBookmarked && item.category === "Movie" ? (
              <Recommand item={item} key={item.title} />
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="tv-bookmark" style={{ marginTop: "5rem" }}>
        <h1 style={{ fontWeight: "lighter" }}>Bookmarked TV Series</h1>
        <div className="recommand-items" style={{ marginTop: "0" }}>
          {allData.map((item) =>
            item.isBookmarked && item.category !== "Movie" ? (
              <Recommand item={item} key={item.title} />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Bookmark;
