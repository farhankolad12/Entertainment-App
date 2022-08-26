import React, { useContext, useEffect, useState } from "react";
import auth from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  function signup(email, pass) {
    return auth.createUserWithEmailAndPassword(email, pass);
  }

  function login(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass);
  }

  function logout() {
    auth.signOut();
  }

  function changePass(pass) {
    return currentUser.updatePassword(pass);
  }

  function forgetPass(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    currentUser?.photoURL
      ? setUserProfile(currentUser.photoURL)
      : setUserProfile(
          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        );
  }, [currentUser]);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    setUserProfile,
    changePass,
    forgetPass,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : "Loading..."}
    </AuthContext.Provider>
  );
}
