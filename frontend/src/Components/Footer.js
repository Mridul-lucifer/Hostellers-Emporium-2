import React from 'react'
import {Link} from 'react-router-dom'
import contact1 from './Pics/contact1.png'
import contact2 from './Pics/contact2.png'
import contact3 from './Pics/contact3.png'
import contact4 from './Pics/contact4.png'
import './Style/Footer.css'
export default function Footer() {
  return (
    <div>
      <div className='Footer-outer'>
        <div className='Footer-innerbox'>
          <h2>
            Contacts
          </h2>
          <div className='Footer-Contact'>
              <div className='Li'><img src={contact1} width="30px" alt=""/><div>Facebook</div></div>
              <div className='Li'><img src={contact2} width="30px"  alt=""/><div>Instagram</div></div>
              <div className='Li'><img src={contact3} width="30px"  alt=""/><div>E-mail</div></div>
              <div className='Li'><img src={contact4} width="30px"  alt=""/><div>WhatsApp</div></div>
          </div>
        </div>
        <div className='Footer-innerbox'>
          <h2>
            Credits
          </h2>
          <div className='Footer-Credit'>
          We would like to express our sincere gratitude to Chitkara University for providing us with this opportunity to work on such an insightful project.
          Thank you to our professors, mentors, and the university staff for their continued support and encouragement
          </div>
        </div>
        <div className='Footer-innerbox'>
          <h2>
            Navigate
          </h2>
          <div className='Footer-Nav'>
            <ul><Link className='link' to="/UpdateProfile"> Update Profile </Link></ul>
            <ul><Link className='link' to="/ChangePassword"> Change Password </Link></ul>
            <ul><Link className='link' to="/DeleteProfile"> Delete Profile </Link></ul>
            <ul><Link className='link' to="/YourProducts"> YourProducts </Link></ul>
            <ul><Link className='link' to='/Query'>Query</Link></ul>
            <ul><Link className='link' to='/YourBoughtProducts'>Your Bought Products</Link></ul>
          </div>
        </div>

      </div>
    </div>
  )
}
