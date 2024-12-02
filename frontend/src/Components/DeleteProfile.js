import React, { useState } from "react";
import "./Style/DeleteProfile.css";
import Logo from "./Pics/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import CompanyName from "./ComanyName";
import axios from "axios";

export default function DeleteProfile() {
  let [Email, setEmail] = useState();
  let [Password, setPassword] = useState();
  const navigate = useNavigate();
  const DeleteAccount = async function (event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/AccountDelete", {
        Email: Email,
        Password: Password,
      });
      navigate("/Home");
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      alert("-> " + response.data.msg);
    } catch (err) {
      alert(
        "Error: " +
          (err.response ? err.response.data.msg : "An unknown error occurred")
      );
    }
  };

  return (
    <div>
      <div className="DeleteProfile-outerbox">
        <div className="DeleteProfile-innerbox-logo">
          <div className="DeleteProfile-Logo">
            <img src={Logo} alt="" />
          </div>
          <h2 className="DeleteProfile-Logo-Name">
            <CompanyName />
          </h2>
        </div>
        <div className="DeleteProfile-innerbox-form">
          <form className="DeleteProfile-form" onSubmit={DeleteAccount}>
            <h1 className="DeleteProfile-Heading">Delete Profile</h1>
            <div>
              <label className="DeleteProfile-Label">Email</label>
              <input
                type="email"
                required
                className="DeleteProfile-Input"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className="DeleteProfile-Label">Password</label>
              <input
                type="password"
                required
                className="DeleteProfile-Input"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button className="DeleteProfile-Button">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}
