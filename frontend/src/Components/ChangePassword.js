import CompanyName from './ComanyName'
import Logo from './Pics/Logo.jpg'
import './Style/ChangePassword.css'
import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
    let [oldPassword,setoldPassword] = useState()
    let [newPassword,setnewPassword] = useState()
    const ChangePassword = async function (event) {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            // Send a POST request to the server
            const response = await axios.post('http://localhost:5000/ChangePassword', {
              Authorization:token,
              oldPassword: oldPassword,
              newPassword: newPassword
            });
      
            // Extract and alert the message from the response data
            alert(response.data.msg);
      
          } catch (err) {
            // Display an error alert if there's an issue with the request
            alert("Error: " + (err.response ? err.response.data.msg : "An unknown error occurred"));
          }
        }
  return (
    <div>
      <div>
      <div className="ChangePassword-outerbox">
        <div className="ChangePassword-innerbox-logo">
          <div className="ChangePassword-Logo">
            <img src={Logo} alt="" />
          </div>
          <h2 className="ChangePassword-Logo-Name">
            <CompanyName />
          </h2>
        </div>
        <div className="ChangePassword-innerbox-form">
          <form className="ChangePassword-form" onSubmit={ChangePassword}>
            <h1 className="ChangePassword-Heading">Change Password</h1>
            <div>
              <label className="ChangePassword-Label">Old Password</label>
              <input
                type="password"
                required
                className="ChangePassword-Input"
                onChange={(event) => setoldPassword(event.target.value)}
              />
            </div>
            <div>
              <label className="ChangePassword-Label">New Password</label>
              <input
                type="password"
                required
                className="ChangePassword-Input"
                onChange={(event) => setnewPassword(event.target.value)}
              />
            </div>
            <button className="ChangePassword-Button">UPDATE</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
