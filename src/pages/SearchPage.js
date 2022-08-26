import React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { useItems } from "../contexts/ItemContext";
import Recommand from "../components/Recommand";

const SearchPage = () => {
  const { q, type } = useParams();

  const { allData, movieItems, tvItems } = useItems();

  return (
    <main>
      <Form link={type} />
      <h2 style={{ marginTop: "1rem", fontWeight: "lighter" }}>
        Searching for "{q}"{" "}
      </h2>
      <div className="recommand-items">
        {type === "home"
          ? allData.map(
              (item) =>
                item.title.toLowerCase().includes(q.toLowerCase()) && (
                  <Recommand item={item} key={item.title} />
                )
            )
          : type === "movie"
          ? movieItems.map(
              (item) =>
                item.title.toLowerCase().includes(q.toLowerCase()) && (
                  <Recommand item={item} key={item.title} />
                )
            )
          : type === "tv"
          ? tvItems.map(
              (item) =>
                item.title.toLowerCase().includes(q.toLowerCase()) && (
                  <Recommand item={item} key={item.title} />
                )
            )
          : type === "bookmark"
          ? allData.map((item) =>
              item.isBookmarked &&
              item.title.toLowerCase().includes(q.toLowerCase()) ? (
                <Recommand item={item} key={item.title} />
              ) : (
                ""
              )
            )
          : ""}
      </div>
    </main>
  );
};

export default SearchPage;
