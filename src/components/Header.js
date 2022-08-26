import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { userProfile } = useAuth();

  return (
    <nav className="navbar">
      <img src={"/assets/logo.svg"} alt="Home" />
      <ul>
        <CustomLink to={"/"} children={<i className={`bi bi-grid-fill`}></i>} />
        <CustomLink
          to={"/movies"}
          children={<i className={`bi bi-film`}></i>}
        />
        <CustomLink
          to={"/tv-series"}
          children={<i className={`bi bi-tv-fill`}></i>}
        />
        <CustomLink
          to={"/bookmarks"}
          children={<i className={`bi bi-bookmark-fill`}></i>}
        />
      </ul>
      <Link
        to={"/profile"}
        className={
          window.location.pathname === "/profile" ? "profile-active" : ""
        }
      >
        <img className="profile" src={userProfile} alt="Profile" />
      </Link>
    </nav>
  );
};

const CustomLink = ({ to, children }) => {
  const currentPath = useResolvedPath(to);
  const isActive = useMatch({ path: currentPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default Header;
