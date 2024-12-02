import React from 'react'
import './Style/HomePage.css'
import type1 from './Pics/type1.jpg'
import type2 from './Pics/type2.jpg'
import type3 from './Pics/type3.jpg'
export default function HomePage() {
  return (
    <div>
      <div className='HomePage-outer'>
        <div className='HomePage-inner1'>
          <h1>ABOUT US</h1>
        </div>
        <div className='HomePage-inner2'> 

Welcome to Hotellers’ Emporium! Our platform is a vibrant marketplace for graduating students from hostels to sell their beloved items. Whether it's t-shirts, accessories, or other essentials, we offer a unique space for 4th-year students to pass on their memories and belongings to the next batch.
<br/><br/>
Our mission is to create a seamless and enjoyable experience for buyers and sellers alike, fostering a community of shared memories and sustainable living. Join us in keeping the spirit of hostel life alive, one item at a time!
        </div>
        <div className='HomePage-images'>
          <div>
            <img src = {type1} alt="" width='300rem' height='400rem'></img>
          </div>
          <div>
            <img src = {type2} alt="" width='300rem' height='400rem'></img>
          </div>
          <div>
            <img src = {type3} alt="" width='300rem' height='400rem'></img>
          </div>
        </div>
      </div>
    </div>
  )
}
