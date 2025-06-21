import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../../components/NavBars/Nav';
import MobileNav from '../../components/NavBars/NavBar';
import Footer from '../../components/footer/Footer';
import './OrdersPage.css';

function OrderPage() {
  const [orders, setOrders] = useState([]);
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
      .get('http://localhost:8080/order/user', { withCredentials: true })
      .then((response) => {
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div className="order-page">
       
                {isMobile ? <MobileNav /> : <Nav />}
            
      <div className="order-container">
        <h1 className="order-title">My Order History</h1>
        <p className="order-subtitle">Track all your EverWood purchases here</p>
        
        {orders.length === 0 ? (
          <p className="no-orders">You have no orders yet. Start shopping now!</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                  <p className="order-date">
                    Placed on: {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`order-status ${
                      order.status === 'deliver' ? 'delivered' : 'canceled'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Shipping Address:</strong> {order.address}</p>
                <p><strong>Total:</strong> ₹{order.price}</p>
              </div>

              <div className="order-items">
                <h3>Items in this order</h3>
                {order.items.map((item) => (
                  <div key={item._id} className="order-item">
                    <p><strong>{item.name}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
