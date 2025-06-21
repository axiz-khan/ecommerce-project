import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import "./OrderRow.css";

function OrderRow({ order }) {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate(`/admin/order/${order._id}`); // Use the actual order ID
  };

  const formattedDate = new Date(order.date).toLocaleDateString(); // Format the date
  const shortId = order._id.slice(-5); // Get the last 5 digits of the ID

  return (
    <div className="orderrow-container">
      <div className="orderrow-id">
        <span>{shortId}</span>
      </div>
      <div className="orderrow-user">
        <span>{order.name}</span>
      </div>
      <div className="orderrow-add">
        <span>{order.address}</span>
      </div>
      <div className="orderrow-date">
        <span>{formattedDate}</span>
      </div>
      <div className="orderrow-price">
        <span>{order.price}</span>
      </div>
      <div className="orderrow-status">
        <span>{order.status}</span>
      </div>
      <div className="orderrow-action">
        <button onClick={handleInfoClick} className="action-btn info">
          <InfoIcon />
        </button>
      </div>
    </div>
  );
}

export default OrderRow;
