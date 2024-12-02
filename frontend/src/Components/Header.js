import React, { useEffect, useState } from 'react'
import Logo from './Pics/Logo.jpg'
import CompanyName from './ComanyName'
import './Style/Header.css'
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();
  const GoToHome = function(){
    Navigate('/Home');
  }
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);
  const handleLogin = () => {
    Navigate('/Login')
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert("Your are logged out")
    Navigate("/Home")
  };
  const toBuyProducts = function(){
    Navigate("/BuyProducts");
  }
  const toSelProducts = function(){
    Navigate("/SellProduct");
  }
  
  return (
    <div>
      <div className='Header-outer'>
        <div className='Header-innerbox-companyName' onClick={GoToHome}>
          <CompanyName/>
        </div>
        <div className='Header-innerbox-logo' onClick={GoToHome}>
          <img src = {Logo} alt="" width='40px'/>
        </div>
        <div className='Header-innerbox-input'>
          <input placeholder='Enter the Product Name'></input>
        </div>
        <div className='Header-innerbox-buySell'>
          <button onClick={toBuyProducts}>Buy</button>
        </div>
        <div className='Header-innerbox-buySell'>
          <button onClick={toSelProducts}>Sell</button>
        </div>
        <div className='Header-innerbox-LoginLogout'>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
        
      </div>
    </div>
  )
}
