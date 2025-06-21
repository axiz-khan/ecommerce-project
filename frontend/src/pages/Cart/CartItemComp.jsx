import React from 'react';
import './CartItemComp.css';

function CartItemComp({ item, onQuantityChange, onDelete }) {
  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <div
          className="cart-item-image"
          style={{ backgroundImage: `url(http://localhost:8080/${item.img_url})` }}
        />
        <div className="cart-item-details">
          <div className="cart-item-name">{item.name}</div>
          <div className="cart-item-price">Price</div>
          <div className="cart-item-price-value">${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div className="cart-item-middle">
        <div className="quantity-label">Quantity</div>
        <div className="quantity-controls">
          <button onClick={() => onQuantityChange(item.itemId, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.itemId, 1)}>+</button>
        </div>
      </div>
      <div className="cart-item-right">
        <div className="cart-item-price-value">
        ₹{(item.price * item.quantity).toFixed(2)}
        </div>
        <button className="remove-btn" onClick={() => onDelete(item.itemId)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItemComp;