import React, { useState } from "react";
import "./Style/Login.css";
import Logo from "./Pics/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import CompanyName from "./ComanyName";
import axios from "axios";
export default function LoginPage() {
  let [Email, setEmail] = useState();
  let [Password, setPassword] = useState();
  const navigate = useNavigate();
  const CheckLogin = async function (event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Login", {
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
      <div className="LoginPage-outerbox">
        <div className="LoginPage-innerbox-logo">
          <div className="LoginPage-Logo">
            <img src={Logo} alt="" />
          </div>
          <h2 className="LoginPage-Logo-Name">
            <CompanyName />
          </h2>
        </div>
        <div className="LoginPage-innerbox-form">
          <form className="LoginPage-form" onSubmit={CheckLogin}>
            <h1 className="LoginPage-Heading">Login</h1>
            <div>
              <label className="LoginPage-Label">Email</label>
              <input
                type="email"
                required
                className="LoginPage-Input"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className="LoginPage-Label">Password</label>
              <input
                type="password"
                required
                className="LoginPage-Input"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button className="LoginPage-Button">SUBMIT</button>
            <Link className="LoginPage-Signup" to="/Signup">
              Dont have any account? Sign up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
