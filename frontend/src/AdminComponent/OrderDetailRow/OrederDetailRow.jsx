import React, { useEffect } from 'react';
import './OrderDetailRow.css';

function OrederDetailRow({ item }) {
  useEffect(() => {
    console.log('Item:', item);
  }, [item]);

  const image = "/test2.webp";

  return (
    <div className='orderdetailrow-main-container'>
      <div className='orderdetailrow-image' style={{ backgroundImage: `url(${image})` }}></div>
      <div className='orderdetailrow-product'>
        <span className='orderdetailrow-heads'>Name</span>
        <span>{item.name}</span>
      </div>
      <div className='orderdetailrow-price'>
        <span className='orderdetailrow-heads'>Price</span>
        <span>{item.price}</span>
      </div>
      <div className='orderdetailrow-quantity'>
        <span className='orderdetailrow-heads'>Quantity</span>
        <span>{item.quantity}</span>
      </div>
      <div className='orderdetailrow-total'>
        <span className='orderdetailrow-heads'>Total Price</span>
        <span>{item.price * item.quantity}</span>
      </div>
    </div>
  );
}

export default OrederDetailRow;
