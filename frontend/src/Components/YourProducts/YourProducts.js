import './YourProducts.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplay from './product_display'; // Ensure this is the correct import

export default function YourProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken');
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post("http://localhost:5000/YourProducts",{
          Authorization: token
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div id="buy-outer">
        <h1 id="buy-heading">YOUR PRODUCTS LISTED</h1>
        <div id="buy-inner">
          <ProductDisplay products={products} /> {/* Pass the products data */}
        </div>
      </div>
    </div>
  );
}
