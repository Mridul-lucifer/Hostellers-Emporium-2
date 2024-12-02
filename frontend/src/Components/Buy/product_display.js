import React from 'react';
import './product_display.css'; // Import the CSS file
import axios from 'axios'

function ProductDisplay({ products }) {
  
  if (!products || products.length === 0) {
    return <div className="product_dispaly-no-products">No products available</div>;
  }
  const ProductSold = async function (id){
    const token = localStorage.getItem('authToken');
    console.log(id)
    try {
      const response = await axios.post('http://localhost:5000/ProductBuying',{
        Authorization: token,
        uniqueId : id
      })
      
      alert(response.data.msg)
      window.location.reload();
    }catch(err){
      alert(err)
    }
  }
    let a = "http://localhost:5000"
  return (
    <div className="product_dispaly">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img className="product_display-img" src = {a+product.ImagePath} alt = "NO Image By Seller"></img>
          <h2 className="product_dispaly-name">ProductName = {product.ProductName}</h2>
          <p className="product_dispaly-Quanity">Quantity = {product.Quantity}</p>
          <p className="product_dispaly-price">Price = ${product.Price}</p>
          <p className="product_dispaly-rating">Rating = {product.rating} &#9733; from {product.sold} Customers </p>
          <p className='product_display-box2'>
            <span>Review &darr;</span>
            {product.review.map(veiw=>(
              <div className='hidden2'>
                <ul>{veiw.by} Says {veiw.review}</ul>
              </div>
            ))}
          </p>
          <p className="product_dispaly-extra">Extra = {product.Extra}</p>
          <button
            className="product_display-buy"
            onClick={() => ProductSold(product.uniqueId)}
          >Buy</button>
        </div>
      ))}
    </div>
  );
}

export default ProductDisplay;

