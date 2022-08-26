import React from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ link }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (e.target[0].value === "" || e.target[0].value === " ") return;

    navigate(`/search/${e.target[0].value}/${link}`);
  };

  return (
    <form className="home-form" onSubmit={handleSearch}>
      <i className="bi bi-search" />
      <input
        className="input"
        placeholder={
          link === "home"
            ? "Search for movies and TV series "
            : link === "movie"
            ? "Search for Movies"
            : link === "tv"
            ? "Search for TV series"
            : link === "bookmark"
            ? "Search for bookmarks"
            : ""
        }
      />
    </form>
  );
};

export default Form;
