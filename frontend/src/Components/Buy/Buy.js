import './buy.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplay from './product_display'; // Ensure this is the correct import

export default function Buy() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken');
    
  useEffect(() => {
    // Fetch products data when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.post("http://localhost:5000/AllProducts",{
          Authorization: token
        });
        console.log('API response:', response.data); // Log the data to ensure it's correct
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <div id="buy-outer">
        <h1 id="buy-heading">PRODUCTS LISTED</h1>
        <div id="buy-inner">
          <ProductDisplay products={products} /> {/* Pass the products data */}
        </div>
      </div>
    </div>
  );
}
