import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Banner.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function Banner({ banners }) {
  const [arrayIndex, setArrayIndex] = useState(0);

  // Extract img_url array from props
  const arrayImage = banners.map(b => b.img_url);

  // Auto-slide
  useEffect(() => {
    const timer = setTimeout(() => {
      setArrayIndex((arrayIndex + 1) % arrayImage.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [arrayIndex, arrayImage.length]);

  // Manual navigation
  const onIncrease = (event) => {
    if (event.currentTarget.className.includes("left-button")) {
      setArrayIndex((arrayIndex + 1) % arrayImage.length);
    } else if (event.currentTarget.className.includes("right-button")) {
      setArrayIndex((arrayIndex - 1 + arrayImage.length) % arrayImage.length);
    }
  };

  return (
    <div className='banner-container' style={{ backgroundImage: `url(http://localhost:8080/${arrayImage[arrayIndex]})` }}>
      <button className='left-button' onClick={onIncrease}>
        <ArrowCircleLeftIcon style={{ color: "#C2A878", fontSize: "3rem" }} />
      </button>
      <div className='content-container'>
        <span className='content-text'>
          <p>Complete 100% plant-powered goodness</p>
        </span>
        <button className='content-button'>
          <Link to="/products" style={{ textDecoration: "none", color: "#DED2BF" }}>SHOP NOW</Link>
        </button>
      </div>
      <button className='right-button' onClick={onIncrease}>
        <ArrowCircleRightIcon style={{ color: "#C2A878", fontSize: "3rem" }} />
      </button>
    </div>
  );
}

export default Banner;
