import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useItems } from "../contexts/ItemContext";
import { firbasestorage } from "../firebase";

const Profile = () => {
  const { currentUser, logout, setUserProfile, changePass } = useAuth();
  const { setAllData } = useItems();
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImgUrl, setSelectedImgUrl] = useState("");

  useEffect(() => {
    currentUser.photoURL === null
      ? setSelectedImgUrl(
          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        )
      : setSelectedImgUrl(currentUser.photoURL);
  }, [currentUser.photoURL]);

  function handleLogout() {
    setAllData([]);
    setUserProfile(
      "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    );
    logout();
  }

  function handleChange(e) {
    e.target.files.length === 0 ? setLoading(true) : setLoading(false);
    setPhoto(e.target.files[0]);

    setSelectedImgUrl(URL.createObjectURL(e.target.files[0]));
  }

  async function handleUpload() {
    setLoading(true);
    const fileRef = firbasestorage.ref().child(`images/${currentUser.uid}.png`);

    await fileRef
      .put(photo)
      .then(() => alert("Profile Updated Refresh to see updated photo"));

    const photoURL = await fileRef.getDownloadURL();

    currentUser.updateProfile({
      photoURL,
    });

    setLoading(false);
  }

  async function handleChangePass(e) {
    e.preventDefault();

    const pass = e.target[1].value;
    const confirmPass = e.target[2].value;

    if (pass === "" || confirmPass === "") return alert("Enter Password!");

    if (pass !== confirmPass) return alert("Password Don't Match");

    try {
      await changePass(pass).then(() => alert("Password Succesfully Changed"));
    } catch (error) {
      alert(error.message);
    }

    e.target.reset();
  }

  return (
    <>
      <div className="profile-container">
        <img src={selectedImgUrl} alt="User Profile" className="profile-img" />
        <div className="profile-input" style={{ position: "relative" }}>
          <input
            onChange={handleChange}
            className="input-file"
            type={"file"}
            accept="image/*"
          />
          <button
            className="upload-btn"
            disabled={loading}
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        <form onSubmit={handleChangePass} className="changepass">
          <label htmlFor="user-email">Email: </label>
          <input
            id="user-email"
            type={"email"}
            disabled
            value={currentUser.email}
          />
          <h3>Change Password</h3>
          <input type={"password"} placeholder="Enter password" />
          <input type={"password"} placeholder="Confirm password" />
          <button className="change-pass" type="submit">
            Change Password
          </button>
        </form>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
