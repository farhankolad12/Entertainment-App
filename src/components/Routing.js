import React from "react";
import Header from "./Header";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import { Routes, Route } from "react-router-dom";
import TvSeries from "../pages/TvSeries";
import SearchPage from "../pages/SearchPage";
import Bookmark from "../pages/Bookmark";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import PrivateRoutes from "./PrivateRoutes";
import ForgetPassword from "../pages/ForgetPassword";

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="auth-container">
            <Login />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="auth-container">
            <SignUp />
          </div>
        }
      />
      <Route
        path="/forget-password"
        element={
          <div className="auth-container">
            <ForgetPassword />
          </div>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoutes
            component={
              <div className="main-container">
                <Header />
                <Home />
              </div>
            }
          />
        }
      />
      <Route
        path="/movies"
        element={
          <PrivateRoutes
            component={
              <div className="main-container">
                <Header />
                <Movies />
              </div>
            }
          />
        }
      />
      <Route
        path="/tv-series"
        element={
          <PrivateRoutes
            component={
              <div className="main-container">
                <Header />
                <TvSeries />
              </div>
            }
          />
        }
      />
      <Route
        path="/bookmarks"
        element={
          <PrivateRoutes
            component={
              <div className="main-container">
                <Header />
                <Bookmark />
              </div>
            }
          />
        }
      />
      <Route
        path={`/search/:q/:type`}
        element={
          <PrivateRoutes
            component={
              <div className="main-container">
                <Header />
                <SearchPage />
              </div>
            }
          />
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoutes
            component={
              <div className="main-container">
                <Header />
                <Profile />
              </div>
            }
          />
        }
      />
    </Routes>
  );
};

export default Routing;
