import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [picture, setPicture] = useState("/profile.png");
  const [file, setfile] = useState(null);

  const fileInput = (e) => {
    const input = e.target;
    if (input.files.length) {
      setPicture(URL.createObjectURL(input.files[0]));
      setfile(input.files[0]);
    } else {
      setPicture("/profile.png");
      setfile(null);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username-input").value.trim();
    let formData = new FormData();
    formData.append("picture", file);
    formData.append("username", username);
    const res = await fetch(`/users/${user.id}`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-type": "application/json",
        Authorization: user?.token ?? "",
      },
    });
    let body = await res.json();
    console.log("status", res.status, body);
    if (res.status === 200) {
      setUser(body);
      document.querySelector("#username-input").value = body.username;
    } else {
      alert(`Error: ${body}`);
    }
  };

  useEffect(() => {
    console.log("page is fully loaded");
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setPicture(JSON.parse(userData).picture);
      document.querySelector("#username-input").value =
        JSON.parse(userData).username;
    } else {
      window.location.href = "/login.html";
    }
  }, []);
  return (
    <>
      <Head>
        <title>TWICHER | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div
        className="settings"
        style={{ maxWidth: "400px", marginTop: "100px" }}>
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Change Your Profile</span>
          </div>
          <form className="settingsForm" onSubmit={updateProfile}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img src={picture ?? "/profile.png"} alt="" id="profilePhoto" />
              <input
                id="fileInput"
                onChange={fileInput}
                type="file"
                multiple={false}
                className="settingsPPInput"
              />
            </div>
            <input
              type="text"
              name="name"
              id="username-input"
              placeholder="Username"
            />
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;