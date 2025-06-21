import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import './Card.css';

function CardComp({ data }) {

    const navigate = useNavigate();

      const handleAddToCart = () => {
       
  
          axios.put(
            `http://localhost:8080/cart/${data._id}?size=1`,
            {}, // Empty body (or actual payload if needed)
            { withCredentials: true }
          )
              .then((response) => {
                  alert("Product added to cart successfully!");
              })
              .catch((error) => {
                  alert("Failed to add product to cart.");
                  console.error(error);
              });
      };

       const handleBuyNow = () => {
        navigate(`/product/${data._id}`);
          };
  
  return (
    <div className="card-box">
      {/* Product Image */}
      <div
        className="image-box"
        style={{
          backgroundImage: `url(http://localhost:8080/${data.img_url})`,
          cursor:"pointer"
        }}
        onClick={() => navigate(`/product/${data._id}`)}
      ></div>

      {/* Product Name */}
      <div className="link-box">
        <a href={`/product/${data._id}`}>{data.name}</a>
      </div>

      {/* Price Section */}
      <div className="price-container">
        {data.original_price && (
          <span className="actual-price">₹{data.original_price}</span>
        )}
        <span className="discount-price">₹{data.selling_price}</span>
      </div>

      {/* Rating Section */}
      <div>
        <Rating
          name="read-only-rating"
          value={data.rate}
          precision={0.5}
          readOnly
        />
      </div>

      {/* Action Buttons */}
      <div className="button-box">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default CardComp;
