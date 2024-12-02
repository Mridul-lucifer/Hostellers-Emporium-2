import CompanyName from './ComanyName'
import Logo from './Pics/Logo.jpg'
import './Style/UpdateProfile.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UpdateProfile() {
    let [Name, setName] = useState();
    let [Email ,setEmail] = useState();
    let [Contact, setContact] = useState();
    const Update = async function (event) {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:5000/UpdateProfile', {
              Authorization:token,
              Name: Name,
              Email:Email,
              Contact: Contact,
            });
            alert(response.data.msg);
          } catch (err) {
            alert("Error: " + (err.response ? err.response.data.msg : "An unknown error occurred"));
          }
    }
  return (
    <div>
      <div>
      <div className="UpdateProfile-outerbox">
        <div className="UpdateProfile-innerbox-logo">
          <div className="UpdateProfile-Logo">
            <img src={Logo} alt="" />
          </div>
          <h2 className="UpdateProfile-Logo-Name">
            <CompanyName />
          </h2>
        </div>
        <div className="UpdateProfile-innerbox-form">
          <form className="UpdateProfile-form" onSubmit={Update}>
            <h1 className="UpdateProfile-Heading">Update Profile</h1>
            <div>
              <label className="UpdateProfile-Label">Name</label>
              <input
                type="text"
                required
                className="UpdateProfile-Input"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label className="UpdateProfile-Label">Email</label>
              <input
                type="email"
                required
                className="UpdateProfile-Input"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className="UpdateProfile-Label">Contact</label>
              <input
                required
                className="UpdateProfile-Input"
                type='tel' pattern="[0-9]{10}"
                onChange={(event) => setContact(event.target.value)}
              />
            </div>
            <button className="UpdateProfile-Button">UPDATE</button>
            <Link className='UpdateProfile-Password' to="/ChangePassword">
              Change Password ?
            </Link>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
