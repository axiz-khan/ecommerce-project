import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComp from './Card';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './CardContainer.css';

function CardContainer({ cateName, items }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="main-card-container">
      <div className="section-header">
        <h2 className="category-title">{cateName}</h2>
      </div>

      <div className="carousel-container">
        <button className="nav-button left" onClick={scrollLeft}>
          <ArrowCircleLeftIcon style={{ color: '#BFA980', fontSize: '2.5rem' }} />
        </button>

        <div className="cards-track" ref={scrollRef}>
          {items.map((item) => (
            <div
              className="card-wrapper"
              key={item._id}
              // onClick={() => handleCardClick(item._id)}
            >
              <CardComp data={item} />
            </div>
          ))}
        </div>

        <button className="nav-button right" onClick={scrollRight}>
          <ArrowCircleRightIcon style={{ color: '#BFA980', fontSize: '2.5rem' }} />
        </button>
      </div>
    </div>
  );
}

export default CardContainer;
