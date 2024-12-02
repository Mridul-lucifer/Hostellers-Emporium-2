import React, { useEffect, useState } from 'react'
import './Style/YourBoughtProducts.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function YourBoughtProducts() {
    let [InProgressBuying,setInProgressBuying]=useState([]);
    let [Bought,setBought]=useState([]);
    const Navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post("http://localhost:5000/YourBoughtProducts",{
          Authorization: token
        });
        setInProgressBuying(response.data.InProgressBuying);
        setBought(response.data.Bought);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    }, []);

    const reviewSystem = async function(bought){
      let rating = prompt(`Enter Rating for ${bought.ProductName}: `)
      let review = prompt(`Enter Review for ${bought.ProductName}: `)
      const response = await axios.post("http://localhost:5000/review",{
        Authorization: token,
        Email : bought.Seller,
        ProductName : bought.ProductName,
        time : bought.time,
        Rating : rating,
        Review : review
      })
      alert(response.data.msg);
    }

    const Chating = function(ChatId){
      localStorage.setItem("ChatId",ChatId);
      Navigate('/ChatingRoom');
    }
  return (
    <div>
    <br/>
      <h2 className='YourBoughtProducts-header'>InProgressBuying : </h2>
      {/* <br/> */}
      <div className='YourBoughtProducts-outer'>
        {InProgressBuying.map(progress=>(
            <div className='YourBoughtProducts-inner'>
                <ul>Product Name : {progress.ProductName}</ul>
                <ul>Units : {progress.Units}</ul>
                <ul>Seller : {progress.Seller}</ul>
                <ul>time : {progress.time}</ul>
                <button className='YourBoughtProducts-button' onClick={()=>{Chating(progress.ChatId)}}>Chat</button>
                <br/>
            </div>
        ))}
      </div>
      {/* <br/> */}
      <h2 className='YourBoughtProducts-header'>Bought : </h2>
      {/* <br/> */}
      <div className='YourBoughtProducts-outer'>
        {Bought.map(boughtProduct=>(
            <div className='YourBoughtProducts-inner'> 
                <ul>Product Name : {boughtProduct.ProductName}</ul>
                <ul>Units : {boughtProduct.Units}</ul>
                <ul>Seller : {boughtProduct.Seller}</ul>
                <ul>time : {boughtProduct.time}</ul>
                <button className='YourBoughtProducts-button' onClick={()=>reviewSystem(boughtProduct)}>Add Review</button>
                <br/> 
            </div>
        ))}
      </div>
    </div>
  )
}
