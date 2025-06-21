import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/NavBars/Nav';
import MobileNav from '../../components/NavBars/NavBar';
import Footer from '../../components/footer/Footer';
import CartItemComp from './CartItemComp';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState({ items: [] }); // Ensure cartItems is an object
  const [totalPrice, setTotalPrice] = useState(0); // Track total price separately
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);

     React.useEffect(() => {
          const handleSize = () => {
              setIsMobile(window.innerWidth <= 700);
          };
          window.addEventListener("resize", handleSize);
          handleSize();
  
          return () => {
              window.removeEventListener("resize", handleSize);
          };
      }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/cart', { withCredentials: true })
      .then((response) => {
        console.log('Cart data:', response.data);
        setCartItems(response.data); // Assuming response.data is an object with `items` and `_id`
        calculateTotalPrice(response.data.items); // Calculate initial total price
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const calculateTotalPrice = (items = []) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedItems = cartItems.items.map((item) => {
      if (item.itemId === id) {
        const newQuantity = item.quantity + delta;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1, // Ensure quantity doesn't go below 1
        };
      }
      return item;
    });

    setCartItems({ ...cartItems, items: updatedItems });
    
    calculateTotalPrice(updatedItems); // Recalculate total
  };

  const handleDelete = (id) => {
    const updatedItems = cartItems.items.filter((item) => item.itemId !== id);
    setCartItems({ ...cartItems, items: updatedItems });
    calculateTotalPrice(updatedItems); // Recalculate total
  };

  const handleUpdateCart = () => {
    axios
      .patch(`http://localhost:8080/cart/${cartItems._id}`, {cartItems}, { withCredentials: true })
      .then((response) => {
        console.log("Updated Data",response.data);
        setCartItems(response.data); // Assuming response.data is an object with `items` and `_id`
        calculateTotalPrice(response.data.items); // Calculate initial total price
      })
      .catch((error) => {
        console.error('Error updating cart:', error);
      });
  };

  const handleCheckout = () => {
    axios
      .post('http://localhost:8080/order', { cartItems,isCart:true }, { withCredentials: true })
      .then((response) => {
        console.log('Order placed successfully:', response.data);
        alert('Order placed successfully!');
        // Optionally, clear the cart or redirect the user
        setCartItems({ items: [] }); // Clear the cart
        setTotalPrice(0); // Reset total price
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place the order. Please try again.');
      });
  };

  return (
    <div className="cart-page">
        {isMobile ? <MobileNav /> : <Nav />}
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-items">
          {cartItems.items.map((item) => (
            <CartItemComp
              key={item.itemId}
              item={item}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Cart Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <button className="update-button" onClick={handleUpdateCart}>
              Update Cart
            </button>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;