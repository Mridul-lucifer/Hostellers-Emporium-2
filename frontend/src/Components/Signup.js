import React, { useState } from 'react'
import './Style/Signup.css'
import Logo from './Pics/Logo.jpg'
import { Link ,useNavigate } from 'react-router-dom';
import CompanyName from './ComanyName';
import axios from 'axios'
export default function Signup() {
  let [Name, setName] = useState();
  let [Email, setEmail] = useState();
  let [Password, setPassword] = useState();
  let [Contact, setContact] = useState();
  const navigate = useNavigate();
  const Register = async function (event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/SignUp', {
        Name: Name,
        Email: Email,
        Password: Password,
        Contact: Contact
      });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      alert(response.data.msg);
      navigate('/Home');
    } catch (err) {
      alert("Error: " + (err.response ? err.response.data.msg : "An unknown error occurred"));
    }
  };

  return (
    <div>
      <div className='Signup-outerbox'>  
        <div className='Signup-innerbox-logo'>
          <div className='Signup-Logo'>     
            <img src={Logo} alt=""/>
          </div> 
          <h2 className='Signup-Logo-Name'><CompanyName/></h2>
        </div>
        <div className='Signup-innerbox-form'>
          <form className='Signup-form' onSubmit={Register}>
            <h1 className='Signup-Heading'>
              Sign up
            </h1>
            <div>
              <label className='Signup-Label'>
                Name
              </label>
              <input type='text' required className='Signup-Input' onChange={(event) => setName(event.target.value)}/>
            </div>
            <div>
              <label className='Signup-Label'>
                Email 
              </label>
              <input type='email' required className='Signup-Input'onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div>
              <label className='Signup-Label'>
                Password
              </label>
              <input type='password' required className='Signup-Input' onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div>
              <label className='Signup-Label'>
                Contact
              </label>
              <input type='tel' pattern="[0-9]{10}" required className='Signup-Input'onChange={(event) => setContact(event.target.value)}/>
            </div>
            <button className='Signup-Button'>
              SUBMIT
            </button>
            <Link className='Signup-Login' to="/Login">
              Already have any account? Login 
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
