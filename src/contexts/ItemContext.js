import React, { useContext, useEffect, useState } from "react";
import data from "../data.json";
import { getDataFromFireStore } from "../helpers/helper";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const ContextProvider = React.createContext();

export const useItems = () => {
  return useContext(ContextProvider);
};

export function ItemContext({ children }) {
  const [allData, setAllData] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const [recommandItems, setRecommandItems] = useState([]);
  const [movieItems, setMovieItems] = useState([]);
  const [tvItems, setTvItems] = useState([]);
  const [bookmarkItems, setBookmarkItems] = useState([]);

  const { currentUser } = useAuth();
  const { userItems } = database;

  const getFromStorage = async () => {
    currentUser &&
      (await getDataFromFireStore(currentUser.uid).then((res) => {
        !res.data() || res.data().items.length === 0
          ? setAllData(data)
          : setAllData(res.data().items);
      }));
  };

  useEffect(() => {
    currentUser && getFromStorage();
  }, []);

  useEffect(() => {
    currentUser &&
      setRecommandItems(allData.filter((item) => !item.isTrending));
    setTrendingItems(allData.filter((item) => item.isTrending));
    setMovieItems(allData.filter((item) => item.category === "Movie"));
    setTvItems(allData.filter((item) => item.category === "TV Series"));
    setBookmarkItems(allData.filter((item) => item.isBookmarked));

    if (currentUser && allData.length > 0)
      userItems.doc(currentUser.uid).set({
        items: allData,
      });
  }, [allData]);

  const bookmarkedItem = (id) => {
    setAllData(
      allData.map((item) =>
        item.id === id
          ? { ...item, isBookmarked: !item.isBookmarked }
          : { ...item }
      )
    );
  };

  const value = {
    trendingItems,
    recommandItems,
    movieItems,
    tvItems,
    bookmarkItems,
    allData,
    bookmarkedItem,
    setAllData,
    getFromStorage,
  };

  return (
    <>
      <ContextProvider.Provider value={value}>
        {children}
      </ContextProvider.Provider>
    </>
  );
}
